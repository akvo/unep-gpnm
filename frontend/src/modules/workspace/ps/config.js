import { t, msg } from '@lingui/macro'
import { countries } from 'countries-list'

export let isoA2 = {
  'country-a': '0A',
}

export let iso2name = {
  '0A': 'Country A',
}

Object.keys(countries).forEach((key) => {
  isoA2[countries[key].name.toLowerCase().replace(/ /g, '-')] = key
  iso2name[key] = countries[key].name
})

export const iso2id = {
  MU: 480,
  PE: 604,
  KH: 116,
  SB: 90,
  EC: 218,
  SN: 686,
  ZA: 710,
  CI: 384,
  CV: 132,
  KI: 296,
  SL: 694,
  ST: 678,
  JM: 388,
  TT: 780,
  GN: 324,
  TV: 798,
  VU: 548,
  TG: 768,
  PG: 598,
  FJ: 242,
}

export const PREFIX_SLUG = 'plastic-strategy'

export const stepsState = [
  { label: 'Instructions', slug: '', checked: false },
  {
    label: 'Governance & Steering Committee',
    slug: '1-governance-steering-committee',
    substeps: [
      { label: 'Intro', slug: '', checked: false },
      {
        label: 'Set up a National Steering Committee',
        slug: 'setup-steering-committee',
        checked: false,
      },
      { label: 'Set up a Working Team', slug: 'setup-team', checked: false },
    ],
  },
  {
    label: 'National Assessment Report on Nitrogen',
    slug: '2-national-assessment-report-on-nitrogen',
    substeps: [
      { label: 'Intro', slug: '', checked: false },
      {
        label: 'Baseline Data & Data Analysis',
        slug: 'baseline-analysis',
        checked: false,
      },
      {
        label: 'Gap Analysis & Data Reliability',
        slug: 'gap-analysis-data-reliability',
        checked: false,
      },
    ],
  },
  {
    label: 'Legislation & Policy Review',
    slug: '3-legislation-policy',
    substeps: [{ label: 'Review & Analyise', slug: '', checked: false }],
  },
  {
    label: 'National Source Inventory Report',
    slug: '4-national-source',
    substeps: [
      { label: 'Intro', slug: '', checked: false },
      {
        label: 'Datasets & Resources for Inventory',
        slug: 'datasets-resources-for-inventory',
        checked: false,
      },
    ],
  },
  {
    label: 'Stakeholder Engagement & Validation of the Assessment Report',
    slug: '5-stakeholder-report',
    substeps: [
      { label: 'Intro', slug: '', checked: false },
      {
        label: 'Stakeholder Identification & Analysis',
        slug: 'stakeholder-identification-analysis',
        checked: false,
      },
      {
        label: 'Who is a Stakeholder?',
        slug: 'who-is-a-stakeholder',
        checked: false,
      },

      {
        label: 'Stakeholder Identification',
        slug: 'stakeholder-identification',
        checked: false,
      },
      {
        label: 'Stakeholder Analysis',
        slug: 'stakeholder-analysis',
        checked: false,
      },
      {
        label: 'Methodological Framework for Analysis',
        slug: 'methodological-framework-analysis',
        checked: false,
      },
      {
        label: 'Agriculture Food Supply Chain Mapping',
        slug: 'agriculture-food-supply-chain-mapping',
        checked: false,
      },
      {
        label: 'Why broaden the perspective?',
        slug: 'why-broaden-the-perspective',
        checked: false,
      },
      {
        label: 'Supporting Detail – Stakeholders in the Nitrogen Life Cycle',
        slug: 'supporting-detail-stakeholders-nitrogen-life-cycle',
        checked: false,
      },
      {
        label: 'Mapping Stakeholder Interests & Influence',
        slug: 'mapping-stakeholder-interests-influence',
        checked: false,
      },
      {
        label: 'Categorizing Stakeholders',
        slug: 'categorizing-stakeholders',
        checked: false,
      },
      {
        label: 'Stakeholder Engagement',
        slug: 'stakeholder-engagement',
        checked: false,
      },
    ],
  },
  {
    label: 'Developing the National Action Plan (NAP)',
    slug: '6-developing-national-action-plan',
    substeps: [
      { label: 'Intro', slug: '', checked: false },
      {
        label: 'National Context',
        slug: 'national-context',
        checked: false,
      },
      {
        label: 'Key Challenges & Opportunities',
        slug: 'key-challenges-opportunities',
        checked: false,
      },
      {
        label: 'Vision, Objectives, Principles, & Targets',
        slug: 'vision-objectives-principles-targets',
        checked: false,
      },
      {
        label: 'Strategic Actions & Interventions',
        slug: 'strategic-actions-interventions',
        checked: false,
      },
      {
        label: 'Monitoring, Reporting & Verification (MRV)',
        slug: 'monitoring-reporting-verification-mrv',
        checked: false,
      },
      {
        label: 'Implementation',
        slug: 'implementation',
        checked: false,
      },
    ],
  },
  {
    label: 'Review & Adoption',
    slug: '7-review-adoption',
  },
]

export const getParentChecked = (step) =>
  step?.substeps?.length
    ? step.substeps.filter((sb) => sb.checked).length === step.substeps.length
    : step?.checked

export const ROLES = [
  {
    key: 'admin',
    label: msg`Admin`,
    description: msg`Admins can edit all content and manage the team`,
  },
  {
    key: 'editor',
    label: msg`Editor`,
    description: msg`Editors can edit all content, but cannot manage the team`,
  },
  {
    key: 'viewer',
    label: msg`Viewer`,
    description: msg`Viewers cannot edit all content`,
  },
]
export const TEAMS = [
  {
    label: msg`Steering Committee`,
    value: 'steering-committee',
    description: msg`Description text for what this is`,
  },
  {
    label: msg`Project Team`,
    value: 'project-team',
    description: msg`Description text for what this is`,
  },
]
