import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { Form as FinalForm, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { createForm } from "final-form";
import { FieldsFromSchema, validateSchema } from "../../utils/form-utils";
import { languages } from "countries-list";
import specificAreasOptions from "./specific-areas.json";
import api from "../../utils/api";
import { cloneDeep } from "lodash";

const geoCoverageTypeOptions = [
  "Global",
  "Regional",
  "National",
  "Sub-national",
  "Transnational",
  "Global with elements in specific areas",
];
const regionOptions = [
  "Africa",
  "Asia and the Pacific",
  "East Asia",
  "Europe",
  "Latin America and Carribean",
  "North America",
  "West Asia",
];

const GeoCoverageInput = (props) => {
  const { countries } = props;
  return (
    <Field
      name="geoCoverageType"
      render={({ input: typeInput }) => {
        return (
          <Field
            name="geoCoverageValue"
            render={({ input }) => {
              if (typeInput.value === "global") return <Input disabled />;
              if (typeInput.value === "sub-national")
                return <Input placeholder="Type regions here..." {...input} />;
              if (typeInput.value === "Other")
                return <Input placeholder="Type here..." {...input} />;
              const selectProps = { ...input };
              if (typeInput.value === "regional") {
                if (input.value === "" || input?.[0] === "") input.onChange([]);
                selectProps.options = regionOptions.map((it) => ({
                  value: it,
                  label: it,
                }));
                selectProps.mode = "multiple";
              } else if (
                typeInput.value === "national" ||
                typeInput.value === "transnational"
              ) {
                selectProps.options =
                  countries &&
                  countries
                    .map((it) => ({
                      value: it.isoCode,
                      label: it.name,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                selectProps.showSearch = true;
                selectProps.filterOption = (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                if (typeInput.value === "transnational") {
                  if (input.value === "" || input?.[0] === "")
                    input.onChange([]);
                  selectProps.mode = "multiple";
                }
              } else if (
                typeInput.value === "global with elements in specific areas"
              ) {
                selectProps.options = specificAreasOptions.map((it) => ({
                  value: it,
                  label: it,
                }));
                selectProps.mode = "multiple";
                if (input.value === "" || input?.[0] === "") input.onChange([]);
              }
              return <Select {...selectProps} />;
            }}
          />
        );
      }}
    />
  );
};

const defaultFormSchema = [
  {
    title: { label: "Title", required: true },
    organisation: {
      label: "Organisation",
      control: "select",
      options: [],
      loading: true,
      showSearch: true,
      required: true,
    },
    publicationYear: { label: "Publication Year" },
    value: {
      type: "group",
      items: {
        valueAmount: { label: "Value Amount", required: true, col: 16 },
        valueCurrency: {
          control: "select",
          options: [],
          label: "Value Currency",
          required: true,
          col: 8,
          space: "ml-2",
        },
        valueRemark: { label: "Value Remark", required: true, col: 24 },
      },
    },
    valid: {
      type: "group",
      items: {
        validFrom: {
          label: "Valid From",
          required: true,
          control: "date",
          col: 12,
        },
        validTo: {
          label: "Valid Until",
          control: "date",
          col: 12,
          space: "ml-2",
        },
      },
    },
    urls: {
      type: "array",
      addLabel: "Add language",
      items: {
        url: { label: "URL", required: true, addonBefore: "https://" },
        lang: {
          label: "Language",
          required: true,
          control: "select",
          showSearch: true,
          options: Object.keys(languages).map((langCode) => ({
            value: langCode,
            label: languages[langCode].name,
          })),
        },
      },
    },
    country: {
      label: "Country",
      control: "select",
      showSearch: true,
      options: [],
    },
    geoCoverageType: {
      label: "Resource Geo-coverage Type",
      required: true,
      control: "select",
      options: geoCoverageTypeOptions.map((it) => ({
        value: it.toLowerCase(),
        label: it,
      })),
    },
    geoCoverageValue: {
      label: "Resource Geo-coverage",
      render: GeoCoverageInput,
    },
    description: { label: "Description", control: "textarea" },
    image: {
      label: "Resource Image",
      control: "file",
      accept: "image/*",
      maxFileSize: 1,
    },
    tags: {
      label: "Tags",
      control: "select",
      options: [],
      loading: true,
      mode: "multiple",
      showSearch: true,
    },
  },
];

const validation = (formSchema) => {
  return validateSchema(
    formSchema.reduce((acc, val) => ({ ...acc, ...val }), {})
  );
};

const AddResourceForm = ({ countries }) => {
  const [formSchema, setFormSchema] = useState(defaultFormSchema);
  const [sending, setSending] = useState(false);
  const [step, setStep] = useState(1);
  const onSubmit = (vals) => {
    const data = { ...vals };
    delete data.date;
    data.urls = vals.urls.filter((it) => it.url.length > 0);
    data.startDate = vals.date[0].toISOString();
    data.endDate = vals.date[1].toISOString();
    if (data.geoCoverageType === "national") {
      data.geoCoverageValue = [data.geoCoverageValue];
    }
    setSending(true);
    api.post("/resource", data).then(() => {
      setSending(false);
      setStep(2);
    });
  };
  useEffect(() => {
    const newSchema = cloneDeep(defaultFormSchema);
    api
      .get("/tag/financing mechanism")
      .then((res) => {
        newSchema[0].tags.options = res.data.map((x) => ({
          value: x.id,
          label: x.tag,
        }));
        newSchema[0].tags.loading = false;
        setFormSchema(newSchema);
        return true;
      })
      .then((res) => {
        api.get("/organisation").then((res) => {
          newSchema[0].organisation.options = res.data.map((it) => ({
            value: it.id,
            label: it.name,
          }));
          newSchema[0].organisation.loading = false;
          setFormSchema(newSchema);
        });
      });
    if (countries) {
      newSchema[0].country.options = countries
        .map((x) => ({
          value: x.isoCode,
          label: x.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      newSchema[0].geoCoverageValue = {
        ...newSchema[0].geoCoverageValue,
        countries: countries,
      };
      setFormSchema(newSchema);
    }
  }, [countries]);

  const form = createForm({
    subscription: {},
    initialValues: { urls: [{ url: "", lang: "en" }] },
    mutators: {
      ...arrayMutators,
    },
    onSubmit,
    validate: validation(formSchema),
  });
  return (
    <div className="add-resource-form">
      {step === 1 && (
        <Form layout="vertical">
          <FinalForm
            form={form}
            render={({ form: { mutators }, handleSubmit }) => {
              return (
                <div>
                  <div className="section">
                    <h3>Financial Resource</h3>
                    <FieldsFromSchema
                      schema={formSchema[0]}
                      mutators={mutators}
                    />
                  </div>
                  <Button
                    loading={sending}
                    type="primary"
                    size="large"
                    onClick={() => handleSubmit()}
                  >
                    Add resource
                  </Button>
                </div>
              );
            }}
          />
        </Form>
      )}
      {step === 2 && (
        <div>
          <h3>Thank you for adding the resource</h3>
          <p>we'll let you know once an admin has approved it</p>
        </div>
      )}
    </div>
  );
};

export default AddResourceForm;
