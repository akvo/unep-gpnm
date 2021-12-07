(ns gpml.db.event
  (:require [hugsql.core :as hugsql])
  (:import [java.time Instant]
           [java.sql Timestamp]))

(hugsql/def-db-fns "gpml/db/event.sql")

(defn time* [] (java.sql.Timestamp. (.toEpochMilli (Instant/now))))

(comment (new-event (dev/db-conn) {:title "title" :start_date (time*) :end_date (time*)
                           :description "desc"
                           :remarks ""
                           :geo_coverage_type "global"
                           :country 4
                           :city "string"
                           :image "image" :url "url"}))
