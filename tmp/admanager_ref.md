# Content from https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DateRange

[Skip to main content](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#main-content)

[![Google Ad Manager](https://developers.google.com/static/ads/images/logo_admanager_192px.svg)](https://developers.google.com/ad-manager)

- [GoogleAd Manager](https://developers.google.com/ad-manager)
- [API (Beta)](https://developers.google.com/ad-manager/api/beta/getting-started)

`/`

Language

- [English](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports)
- [Deutsch](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=de)
- [Español](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=es)
- [Français](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=fr)
- [Indonesia](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=id)
- [Português – Brasil](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=pt-br)
- [Русский](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=ru)
- [中文 – 简体](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=zh-cn)
- [日本語](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=ja)
- [한국어](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports?hl=ko)

[Sign in](https://developers.google.com/_d/signin?continue=https%3A%2F%2Fdevelopers.google.com%2Fad-manager%2Fapi%2Fbeta%2Freference%2Frest%2Fv1%2Fnetworks.reports&prompt=select_account)

- On this page
- [Resource: Report](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#resource:-report)
- [Visibility](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#visibility)
- [ReportDefinition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reportdefinition)
- [Dimension](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#dimension)
- [Metric](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#metric)
- [Filter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#filter)
- [FieldFilter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#fieldfilter)
- [Field](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#field)
- [Operation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#operation)
- [ReportValue](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reportvalue)
- [IntList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#intlist)
- [StringList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#stringlist)
- [DoubleList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#doublelist)
- [Slice](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#slice)
- [MetricValueType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#metricvaluetype)
- [FilterList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#filterlist)
- [TimeZoneSource](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timezonesource)
- [DateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#daterange)
- [FixedDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#fixeddaterange)
- [Date](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#date)
- [RelativeDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#relativedaterange)
- [ReportType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reporttype)
- [TimePeriodColumn](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timeperiodcolumn)
- [Flag](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#flag)
- [Sort](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#sort)
- [ScheduleOptions](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#scheduleoptions)
- [Schedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#schedule)
- [WeeklySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#weeklyschedule)
- [DayOfWeek](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#dayofweek)
- [MonthlySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#monthlyschedule)
- [Frequency](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#frequency)
- [TimeOfDay](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timeofday)
- [DeliveryCondition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#deliverycondition)
- [Methods](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#methods)
  - [create](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#create)
  - [get](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#get)
  - [list](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#list)
  - [patch](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#patch)
  - [run](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#run)

To discuss and provide feedback on our products, join the official Ad Manager Discord channel in the [Google Advertising and Measurement Community](https://goo.gle/google-ad-manager-discord) server.


- [Home](https://developers.google.com/)
- [Products](https://developers.google.com/products)
- [Ad Manager](https://developers.google.com/ad-manager)
- [API (Beta)](https://developers.google.com/ad-manager/api/beta/getting-started)
- [Reference](https://developers.google.com/ad-manager/api/beta/docs/release-notes)

Was this helpful?



 Send feedback



# REST Resource: networks.reports    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Resource: Report](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#resource:-report)
- [Visibility](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#visibility)
- [ReportDefinition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reportdefinition)
- [Dimension](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#dimension)
- [Metric](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#metric)
- [Filter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#filter)
- [FieldFilter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#fieldfilter)
- [Field](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#field)
- [Operation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#operation)
- [ReportValue](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reportvalue)
- [IntList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#intlist)
- [StringList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#stringlist)
- [DoubleList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#doublelist)
- [Slice](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#slice)
- [MetricValueType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#metricvaluetype)
- [FilterList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#filterlist)
- [TimeZoneSource](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timezonesource)
- [DateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#daterange)
- [FixedDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#fixeddaterange)
- [Date](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#date)
- [RelativeDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#relativedaterange)
- [ReportType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#reporttype)
- [TimePeriodColumn](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timeperiodcolumn)
- [Flag](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#flag)
- [Sort](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#sort)
- [ScheduleOptions](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#scheduleoptions)
- [Schedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#schedule)
- [WeeklySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#weeklyschedule)
- [DayOfWeek](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#dayofweek)
- [MonthlySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#monthlyschedule)
- [Frequency](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#frequency)
- [TimeOfDay](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#timeofday)
- [DeliveryCondition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#deliverycondition)
- [Methods](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#methods)
  - [create](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#create)
  - [get](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#get)
  - [list](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#list)
  - [patch](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#patch)
  - [run](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#run)

![Spark icon](https://developers.google.com/_static/images/icons/spark.svg)

## Page Summary

outlined\_flag

- The Google Ad Manager API (beta) provides resources for generating reports, centered around the `Report` resource for configuration and `ReportDefinition` for specifying report details like dimensions, metrics, and filters.

- Numerous dimensions are available to break down report data, covering areas such as ad unit, audience, technical details, traffic, deals, creatives, privacy, time, location, inventory, and line items, each with specific compatible report types and data formats.

- A wide array of metrics are available to measure performance, including Active View, AdSense, Ad Exchange, Ad Server, Ads Traffic Navigator, revenue, impressions, clicks, ad speed, reach, privacy, rich media, video, server-side unwrapping, partner sales, and programmatic data.

- Supporting structures like `Filter`, `Field`, `Operation`, and various value types are defined to enable detailed report filtering and data representation.

- Reports can be scheduled using `ScheduleOptions`, which include schedule details, delivery conditions, and flags for condition evaluation, with various frequency and time period options available.


- [Resource: Report](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Report)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Report.SCHEMA_REPRESENTATION)
- [Visibility](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Visibility)
- [ReportDefinition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ReportDefinition)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ReportDefinition.SCHEMA_REPRESENTATION)
- [Dimension](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Dimension)
- [Metric](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Metric)
- [Filter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Filter)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Filter.SCHEMA_REPRESENTATION)
- [FieldFilter](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FieldFilter)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FieldFilter.SCHEMA_REPRESENTATION)
- [Field](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Field)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Field.SCHEMA_REPRESENTATION)
- [Operation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Operation)
- [ReportValue](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ReportValue)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ReportValue.SCHEMA_REPRESENTATION)
- [IntList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#IntList)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#IntList.SCHEMA_REPRESENTATION)
- [StringList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#StringList)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#StringList.SCHEMA_REPRESENTATION)
- [DoubleList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DoubleList)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DoubleList.SCHEMA_REPRESENTATION)
- [Slice](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Slice)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Slice.SCHEMA_REPRESENTATION)
- [MetricValueType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#MetricValueType)
- [FilterList](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FilterList)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FilterList.SCHEMA_REPRESENTATION)
- [TimeZoneSource](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#TimeZoneSource)
- [DateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DateRange)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DateRange.SCHEMA_REPRESENTATION)
- [FixedDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FixedDateRange)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#FixedDateRange.SCHEMA_REPRESENTATION)
- [Date](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Date)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Date.SCHEMA_REPRESENTATION)
- [RelativeDateRange](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#RelativeDateRange)
- [ReportType](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ReportType)
- [TimePeriodColumn](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#TimePeriodColumn)
- [Flag](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Flag)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Flag.SCHEMA_REPRESENTATION)
- [Sort](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Sort)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Sort.SCHEMA_REPRESENTATION)
- [ScheduleOptions](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ScheduleOptions)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#ScheduleOptions.SCHEMA_REPRESENTATION)
- [Schedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Schedule)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Schedule.SCHEMA_REPRESENTATION)
- [WeeklySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#WeeklySchedule)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#WeeklySchedule.SCHEMA_REPRESENTATION)
- [DayOfWeek](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DayOfWeek)
- [MonthlySchedule](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#MonthlySchedule)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#MonthlySchedule.SCHEMA_REPRESENTATION)
- [Frequency](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#Frequency)
- [TimeOfDay](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#TimeOfDay)
  - [JSON representation](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#TimeOfDay.SCHEMA_REPRESENTATION)
- [DeliveryCondition](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#DeliveryCondition)
- [Methods](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports#METHODS_SUMMARY)

## Resource: Report

The `Report` resource.

| JSON representation |
| --- |
| ```<br>{<br>  "name": string,<br>  "reportId": string,<br>  "visibility": enum (Visibility),<br>  "reportDefinition": {<br>    object (ReportDefinition)<br>  },<br>  "displayName": string,<br>  "updateTime": string,<br>  "createTime": string,<br>  "locale": string,<br>  "scheduleOptions": {<br>    object (ScheduleOptions)<br>  }<br>}<br>``` |

| Fields |
| --- |
| `name` | `string`<br>Identifier. The resource name of the report. Report resource name have the form: `networks/{networkCode}/reports/{reportId}` |
| `reportId` | `string (int64 format)`<br>Output only. Report ID. |
| `visibility` | `enum (Visibility)`<br>Optional. The visibility of a report. |
| `reportDefinition` | `object (ReportDefinition)`<br>Required. The report definition of the report. |
| `displayName` | `string`<br>Optional. Display name for the report. |
| `updateTime` | `string (Timestamp format)`<br>Output only. The instant this report was last modified.<br>Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `createTime` | `string (Timestamp format)`<br>Output only. The instant this report was created.<br>Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `locale` | `string`<br>Output only. The locale of this report. Locale is set from the user's locale at the time of the request. Locale can't be modified. |
| `scheduleOptions` | `object (ScheduleOptions)`<br>Optional. The schedule options of this report. |

## Visibility

The visibility of a report.

| Enums |
| --- |
| `HIDDEN` | Default value. Reports with hidden visibility won't appear in the Ad Manager UI. |
| `DRAFT` | Reports with draft visibility will appear in the Ad Manager UI only if the user has configured the UI to show them. |
| `VISIBLE` | Reports with this visibility will appear in the Ad Manager UI. |
| `SAVED` | Deprecated: Use `VISIBLE`. Reports with saved visibility will appear in the Ad Manager UI by default. This is an alias for `VISIBLE` and will be removed in the future. |

## ReportDefinition

The definition of how a report should be run.

| JSON representation |
| --- |
| ```<br>{<br>  "dimensions": [<br>    enum (Dimension)<br>  ],<br>  "metrics": [<br>    enum (Metric)<br>  ],<br>  "filters": [<br>    {<br>      object (Filter)<br>    }<br>  ],<br>  "timeZoneSource": enum (TimeZoneSource),<br>  "timeZone": string,<br>  "currencyCode": string,<br>  "dateRange": {<br>    object (DateRange)<br>  },<br>  "customDimensionKeyIds": [<br>    string<br>  ],<br>  "lineItemCustomFieldIds": [<br>    string<br>  ],<br>  "orderCustomFieldIds": [<br>    string<br>  ],<br>  "creativeCustomFieldIds": [<br>    string<br>  ],<br>  "reportType": enum (ReportType),<br>  "timePeriodColumn": enum (TimePeriodColumn),<br>  "flags": [<br>    {<br>      object (Flag)<br>    }<br>  ],<br>  "sorts": [<br>    {<br>      object (Sort)<br>    }<br>  ],<br>  "comparisonDateRange": {<br>    object (DateRange)<br>  }<br>}<br>``` |

| Fields |
| --- |
| `dimensions[]` | `enum (Dimension)`<br>Required. The list of dimensions to report on. If empty, the report will have no dimensions, and any metrics will be totals. |
| `metrics[]` | `enum (Metric)`<br>Required. The list of metrics to report on. If empty, the report will have no metrics. |
| `filters[]` | `object (Filter)`<br>Optional. The filters for this report. |
| `timeZoneSource` | `enum (TimeZoneSource)`<br>Optional. Where to get the time zone for this report. Defaults to using the network time zone setting (PUBLISHER). If source is PROVIDED, the timeZone field in the report definition must also set a time zone. |
| `timeZone` | `string`<br>Optional. If timeZoneSource is PROVIDED, this is the time zone to use for this report. Leave empty for any other time zone source. Time zone in IANA format. For example, "America/New\_York". |
| `currencyCode` | `string`<br>Optional. The ISO 4217 currency code for this report. Defaults to publisher currency code if not specified. |
| `dateRange` | `object (DateRange)`<br>Required. The primary date range of this report. |
| `customDimensionKeyIds[]` | `string (int64 format)`<br>Optional. Custom Dimension keys that represent CUSTOM\_DIMENSION\_\* dimensions. The index of this repeated field corresponds to the index on each dimension. For example, customDimensionKeyIds\[0\] describes CUSTOM\_DIMENSION\_0\_VALUE\_ID and CUSTOM\_DIMENSION\_0\_VALUE. |
| `lineItemCustomFieldIds[]` | `string (int64 format)`<br>Optional. Custom field IDs that represent LINE\_ITEM\_CUSTOM\_FIELD\_\* dimensions. The index of this repeated field corresponds to the index on each dimension. For example, lineItemCustomFieldIds\[0\] describes LINE\_ITEM\_CUSTOM\_FIELD\_0\_OPTION\_ID and LINE\_ITEM\_CUSTOM\_FIELD\_0\_VALUE. |
| `orderCustomFieldIds[]` | `string (int64 format)`<br>Optional. Custom field IDs that represent ORDER\_CUSTOM\_FIELD\_\* dimensions. The index of this repeated field corresponds to the index on each dimension. For example, orderCustomFieldIds\[0\] describes ORDER\_CUSTOM\_FIELD\_0\_OPTION\_ID and ORDER\_CUSTOM\_FIELD\_0\_VALUE. |
| `creativeCustomFieldIds[]` | `string (int64 format)`<br>Optional. Custom field IDs that represent CREATIVE\_CUSTOM\_FIELD\_\* dimensions. The index of this repeated field corresponds to the index on each dimension. For example, creativeCustomFieldIds\[0\] describes CREATIVE\_CUSTOM\_FIELD\_0\_OPTION\_ID and CREATIVE\_CUSTOM\_FIELD\_0\_VALUE. |
| `reportType` | `enum (ReportType)`<br>Required. The type of this report. |
| `timePeriodColumn` | `enum (TimePeriodColumn)`<br>Optional. Include a time period column to introduce comparison columns in the report for each generated period. For example, set to "QUARTERS" here to have a column for each quarter present in the primary date range. If "PREVIOUS PERIOD" is specified in comparisonDateRange, then each quarter column will also include comparison values for its relative previous quarter. |
| `flags[]` | `object (Flag)`<br>Optional. List of flags for this report. Used to flag rows in a result set based on a set of defined filters. |
| `sorts[]` | `object (Sort)`<br>Optional. Default sorts to apply to this report. |
| `comparisonDateRange` | `object (DateRange)`<br>Optional. The comparison date range of this report. If unspecified, the report won't have any comparison metrics. |

## Dimension

Reporting dimensions.

| Enums |
| --- |
| `DIMENSION_UNSPECIFIED` | Default value. This value is unused. |
| `ACTIVE_VIEW_MEASUREMENT_SOURCE` | The measurement source of a video ad.<br>Corresponds to "Active View measurement source value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `ACTIVE_VIEW_MEASUREMENT_SOURCE_NAME` | Active View measurement source localized name.<br>Corresponds to "Active View measurement source" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ADVERTISER_CREDIT_STATUS` | Advertiser credit status ENUM<br>Corresponds to "Advertiser credit status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `ENUM` |
| `ADVERTISER_CREDIT_STATUS_NAME` | Advertiser credit status localized name<br>Corresponds to "Advertiser credit status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `ADVERTISER_DOMAIN_NAME` | The domain name of the advertiser.<br>Corresponds to "Advertiser domain" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ADVERTISER_EXTERNAL_ID` | The ID used in an external system for advertiser identification<br>Corresponds to "Advertiser external ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `ADVERTISER_ID` | The ID of an advertiser company assigned to an order<br>Corresponds to "Advertiser ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `ADVERTISER_LABELS` | Labels applied to the advertiser can be used for either competitive exclusion or ad exclusion<br>Corresponds to "Advertiser labels" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING_LIST` |
| `ADVERTISER_LABEL_IDS` | Label ids applied to the advertiser can be used for either competitive exclusion or ad exclusion<br>Corresponds to "Advertiser label IDs" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `IDENTIFIER_LIST` |
| `ADVERTISER_NAME` | The name of an advertiser company assigned to an order<br>Corresponds to "Advertiser" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `ADVERTISER_PRIMARY_CONTACT` | The name of the contact associated with an advertiser company<br>Corresponds to "Advertiser primary contact" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `ADVERTISER_STATUS` | Advertiser status ENUM<br>Corresponds to "Advertiser status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `ADVERTISER_STATUS_NAME` | Advertiser status localized name<br>Corresponds to "Advertiser status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ADVERTISER_TYPE` | Advertiser type ENUM<br>Corresponds to "Advertiser type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `ENUM` |
| `ADVERTISER_TYPE_NAME` | Advertiser type localized name<br>Corresponds to "Advertiser type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `ADVERTISER_VERTICAL` | The category of an advertiser, such as Arts & Entertainment or Travel & Tourism.<br>Corresponds to "Advertiser vertical" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ADX_PRODUCT` | Classification of different Ad Exchange products.<br>Corresponds to "Ad Exchange product value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REVENUE_VERIFICATION`<br>Data format: `ENUM` |
| `ADX_PRODUCT_NAME` | Localized name of the classification of different Ad Exchange products.<br>Corresponds to "Ad Exchange product" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REVENUE_VERIFICATION`<br>Data format: `STRING` |
| `AD_EXPERIENCES_TYPE` | Ad experiences type.<br>Corresponds to "Ad experiences value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `AD_EXPERIENCES_TYPE_NAME` | Localized name of the Ad experiences type.<br>Corresponds to "Ad experiences" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AD_LOCATION` | Shows an ENUM value describing whether a given piece of publisher inventory was above (ATF) or below the fold (BTF) of a page.<br>Corresponds to "Ad location value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `AD_LOCATION_NAME` | Shows a localized string describing whether a given piece of publisher inventory was above (ATF) or below the fold (BTF) of a page.<br>Corresponds to "Ad location" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AD_REQUEST_SIZES` | Multi-size inventory in an ad request.<br>Corresponds to "Ad request sizes" in the Ad Manager UI.<br>Compatible with the following report types: <br>Data format: `STRING_LIST` |
| `AD_TECHNOLOGY_PROVIDER_DOMAIN` | The domain of the ad technology provider associated with the bid.<br>Corresponds to "Ad technology provider domain" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AD_TECHNOLOGY_PROVIDER_ID` | The ID of the ad technology provider associated with the bid.<br>Corresponds to "Ad technology provider ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AD_TECHNOLOGY_PROVIDER_NAME` | The name of the ad technology provider associated with the bid.<br>Corresponds to "Ad technology provider" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AD_TYPE` | Segmentation of ad types.<br>Corresponds to "Ad type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `AD_TYPE_NAME` | Localized name of the ad type.<br>Corresponds to "Ad type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AD_UNIT_CODE` | The code of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_1` | The code of the first level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 1" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_10` | The code of the tenth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 10" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_11` | The code of the eleventh level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 11" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_12` | The code of the twelfth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 12" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_13` | The code of the thirteenth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 13" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_14` | The code of the fourteenth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 14" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_15` | The code of the fifteenth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 15" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_16` | The code of the sixteenth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 16" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_2` | The code of the second level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 2" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_3` | The code of the third level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 3" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_4` | The code of the fourth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 4" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_5` | The code of the fifth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 5" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_6` | The code of the sixth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 6" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_7` | The code of the seventh level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 7" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_8` | The code of the eighth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 8" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_CODE_LEVEL_9` | The code of the ninth level ad unit of the ad unit where the ad was requested.<br>Corresponds to "Ad unit code level 9" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_ID` | The ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_ALL_LEVEL` | The full hierarchy of ad unit IDs where the ad was requested, from root to leaf, excluding the root ad unit ID.<br>Corresponds to "Ad unit ID (all levels)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `IDENTIFIER_LIST` |
| `AD_UNIT_ID_LEVEL_1` | The first level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 1" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_10` | The tenth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 10" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_11` | The eleventh level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 11" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_12` | The twelfth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 12" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_13` | The thirteenth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 13" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_14` | The fourteenth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 14" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_15` | The fifteenth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 15" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_16` | The sixteenth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 16" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_2` | The second level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 2" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_3` | The third level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 3" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_4` | The fourth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 4" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_5` | The fifth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 5" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_6` | The sixth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 6" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_7` | The seventh level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 7" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_8` | The eighth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 8" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_LEVEL_9` | The ninth level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID level 9" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_ID_TOP_LEVEL` | The top-level ad unit ID of the ad unit where the ad was requested.<br>Corresponds to "Ad unit ID (top level)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `IDENTIFIER` |
| `AD_UNIT_NAME` | The name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `AD_UNIT_NAME_ALL_LEVEL` | The full hierarchy of ad unit names where the ad was requested, from root to leaf, excluding the root ad unit name.<br>Corresponds to "Ad unit (all levels)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING_LIST` |
| `AD_UNIT_NAME_LEVEL_1` | The first level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 1" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_10` | The tenth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 10" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_11` | The eleventh level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 11" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_12` | The twelfth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 12" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_13` | The thirteenth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 13" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_14` | The fourteenth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 14" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_15` | The fifteenth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 15" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_16` | The sixteenth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 16" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_2` | The second level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 2" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_3` | The third level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 3" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_4` | The fourth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 4" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_5` | The fifth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 5" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_6` | The sixth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 6" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_7` | The seventh level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 7" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_8` | The eighth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 8" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_LEVEL_9` | The ninth level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit level 9" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AD_UNIT_NAME_TOP_LEVEL` | The top-level ad unit name of the ad unit where the ad was requested.<br>Corresponds to "Ad unit (top level)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `AD_UNIT_REWARD_AMOUNT` | The reward amount of the ad unit where the ad was requested.<br>Corresponds to "Ad unit reward amount" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`<br>Data format: `INTEGER` |
| `AD_UNIT_REWARD_TYPE` | The reward type of the ad unit where the ad was requested.<br>Corresponds to "Ad unit reward type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `REACH`<br>Data format: `STRING` |
| `AD_UNIT_STATUS` | The status of the ad unit<br>Corresponds to "Ad unit status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `ENUM` |
| `AD_UNIT_STATUS_NAME` | The name of the status of the ad unit<br>Corresponds to "Ad unit status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `AGENCY_LEVEL_1_ID` | The ID of an agency at level 1 of agency hierarchy.<br>Corresponds to "Agency ID (Level 1)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AGENCY_LEVEL_1_NAME` | The name of an agency at level 1 of agency hierarchy.<br>Corresponds to "Agency (Level 1)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AGENCY_LEVEL_2_ID` | The ID of an agency at level 2 of agency hierarchy.<br>Corresponds to "Agency ID (Level 2)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AGENCY_LEVEL_2_NAME` | The name of an agency at level 2 of agency hierarchy.<br>Corresponds to "Agency (Level 2)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AGENCY_LEVEL_3_ID` | The ID of an agency at level 3 of agency hierarchy.<br>Corresponds to "Agency ID (Level 3)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AGENCY_LEVEL_3_NAME` | The name of an agency at level 3 of agency hierarchy.<br>Corresponds to "Agency (Level 3)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AGE_BRACKET` | User age bracket enum.<br>Corresponds to "Age bracket value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `AGE_BRACKET_NAME` | Localized user age bracket returned from Google Analytics. For example, "18-24", "25-34", "35-44", "45-54", "55-64", "65+".<br>Corresponds to "Age bracket" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ANALYTICS_PROPERTY_ID` | Property ID in Google Analytics<br>Corresponds to "Analytics property ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `ANALYTICS_PROPERTY_NAME` | Property name in Google Analytics<br>Corresponds to "Analytics property" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `APP_TRACKING_TRANSPARENCY_CONSENT_STATUS` | Enum value for App Tracking Transparency consent status.<br>Corresponds to "App Tracking Transparency consent status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `APP_TRACKING_TRANSPARENCY_CONSENT_STATUS_NAME` | Localized string value for App Tracking Transparency consent status.<br>Corresponds to "App Tracking Transparency consent status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `APP_VERSION` | The app version.<br>Corresponds to "App version" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AUCTION_PACKAGE_DEAL` | The name of Auction Package deal<br>Corresponds to "Auction package deal" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AUCTION_PACKAGE_DEAL_ID` | The ID of Auction Package deal<br>Corresponds to "Auction package deal ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AUDIENCE_SEGMENT_BILLABLE` | Name of billable audience segment.<br>Corresponds to "Audience segment (billable)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AUDIENCE_SEGMENT_DATA_PROVIDER_ID` | ID of the data provider for the audience segment.<br>Corresponds to "Audience segment data provider ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AUDIENCE_SEGMENT_DATA_PROVIDER_NAME` | Name of the data provider for the audience segment.<br>Corresponds to "Audience segment data provider" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `AUDIENCE_SEGMENT_ID_BILLABLE` | ID of billable audience segment.<br>Corresponds to "Audience segment ID (billable)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `AUDIENCE_SEGMENT_ID_TARGETED` | ID of targeted audience segment, including all first-party and third-party segments that matched the user on the winning line item.<br>Corresponds to "Audience segment ID (targeted)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `IDENTIFIER` |
| `AUDIENCE_SEGMENT_TARGETED` | Name of targeted audience segment, including all first-party and third-party segments that matched the user on the winning line item.<br>Corresponds to "Audience segment (targeted)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `STRING` |
| `AUDIENCE_SEGMENT_TARGETED_AD_ID_USER_SIZE` | Number of AdID identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) AdID size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_AMAZON_FIRE_USER_SIZE` | Number of Amazon Fire identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Amazon Fire size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_ANDROID_TV_USER_SIZE` | Number of Android TV identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Android TV size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_APPLE_TV_USER_SIZE` | Number of Apple TV identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Apple TV size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_IDFA_USER_SIZE` | Number of IDFA identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) IDFA size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_MOBILE_WEB_USER_SIZE` | Number of mobile web identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) mobile web size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_PLAYSTATION_USER_SIZE` | Number of PlayStation identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) PlayStation size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_PPID_USER_SIZE` | Number of PPID identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) PPID size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_ROKU_USER_SIZE` | Number of Roku identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Roku size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_SAMSUNG_TV_USER_SIZE` | Number of Samsung TV identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Samsung TV size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_SIZE` | Number of identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUDIENCE_SEGMENT_TARGETED_STATUS` | Status of the audience segment.<br>Corresponds to "Audience segment (targeted) status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `ENUM` |
| `AUDIENCE_SEGMENT_TARGETED_STATUS_NAME` | Name of the status of the audience segment.<br>Corresponds to "Audience segment (targeted) status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `STRING` |
| `AUDIENCE_SEGMENT_TARGETED_XBOX_USER_SIZE` | Number of Xbox identifiers in the audience segment.<br>Corresponds to "Audience segment (targeted) Xbox size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `INTEGER` |
| `AUTO_REFRESHED_TRAFFIC` | Enum value of Auto refreshed traffic.<br>Corresponds to "Auto refreshed traffic value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `AUTO_REFRESHED_TRAFFIC_NAME` | Indicates if the traffic is from auto-refreshed ad requests.<br>Corresponds to "Auto refreshed traffic" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `BIDDER_ENCRYPTED_ID` | The encrypted version of BIDDER\_ID.<br>Corresponds to "Bidder encrypted ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REVENUE_VERIFICATION`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `BIDDER_NAME` | The name of the bidder.<br>Corresponds to "Bidder" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REVENUE_VERIFICATION`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `BID_RANGE` | The cpm range within which a bid falls.<br>Corresponds to "Bid Range" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `BID_RANGE` |
| `BID_REJECTION_REASON` | The reason a bid was rejected.<br>Corresponds to "Bid rejection reason value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `BID_REJECTION_REASON_NAME` | The localized name of the reason a bid was rejected.<br>Corresponds to "Bid rejection reason" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `BRANDING_TYPE` | The amount of information about the Publisher's page sent to the buyer who purchased the impressions.<br>Corresponds to "Branding type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `BRANDING_TYPE_NAME` | The localized version of branding type, the amount of information about the Publisher's page sent to the buyer who purchased the impressions.<br>Corresponds to "Branding type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `BROWSER_CATEGORY` | Browser category.<br>Corresponds to "Browser category value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `ENUM` |
| `BROWSER_CATEGORY_NAME` | Browser category name.<br>Corresponds to "Browser category" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `BROWSER_ID` | The ID of the browser.<br>Corresponds to "Browser ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `IDENTIFIER` |
| `BROWSER_NAME` | The name of the browser.<br>Corresponds to "Browser" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `BUYER_NETWORK_ID` | The ID of the buyer network.<br>Corresponds to "Buyer network ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `BUYER_NETWORK_NAME` | The name of the buyer network.<br>Corresponds to "Buyer network" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CALLOUT_STATUS_CATEGORY_NAME` | The callout status category name in the Ads traffic navigator report.<br>Corresponds to "Callout status category" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `CARRIER_ID` | Mobile carrier ID.<br>Corresponds to "Carrier ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CARRIER_NAME` | Name of the mobile carrier.<br>Corresponds to "Carrier" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CHANNEL` | Inventory segmentation by channel.<br>Corresponds to "Channel" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CHILD_NETWORK_CODE` | Child Publisher Network Code<br>Corresponds to "Child network code" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CHILD_NETWORK_ID` | Child Publisher Network ID<br>Corresponds to "Child network ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CHILD_PARTNER_NAME` | Child Partner Network Name<br>Corresponds to "Child network" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CITY_ID` | The criteria ID of the city in which the ad served.<br>Corresponds to "City ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `CITY_NAME` | The name of the city in which the ad served.<br>Corresponds to "City" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `CLASSIFIED_ADVERTISER_ID` | The ID of an advertiser, classified by Google, associated with a creative transacted<br>Corresponds to "Advertiser ID (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `CLASSIFIED_ADVERTISER_NAME` | The name of an advertiser, classified by Google, associated with a creative transacted<br>Corresponds to "Advertiser (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `CLASSIFIED_BRAND_ID` | ID of the brand, as classified by Google,<br>Corresponds to "Brand ID (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `IDENTIFIER` |
| `CLASSIFIED_BRAND_NAME` | Name of the brand, as classified by Google,<br>Corresponds to "Brand (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `CONTENT_BUNDLE_ID` | ID of the video content bundle served.<br>Corresponds to "Content bundle ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CONTENT_BUNDLE_NAME` | Name of the video content bundle served.<br>Corresponds to "Content bundle" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTENT_CMS_METADATA_KV_NAMESPACE_ID` | ID of the video content metadata namespace served.<br>Corresponds to "CMS metadata key ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CONTENT_CMS_METADATA_KV_NAMESPACE_NAME` | Name of the video content metadata namespace served.<br>Corresponds to "CMS metadata key" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTENT_CMS_NAME` | The display name of the CMS content.<br>Corresponds to "Content source name" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTENT_CMS_VIDEO_ID` | The CMS content ID of the video content.<br>Corresponds to "ID of the video in the content source" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTENT_ID` | ID of the video content served.<br>Corresponds to "Content ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CONTENT_MAPPING_PRESENCE` | Content mapping presence ENUM value<br>Corresponds to "Content mapping presence value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CONTENT_MAPPING_PRESENCE_NAME` | Content mapping presence name<br>Corresponds to "Content mapping presence" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTENT_NAME` | Name of the video content served.<br>Corresponds to "Content" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CONTINENT` | The continent in which the ad served (derived from country).<br>Corresponds to "Continent value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CONTINENT_NAME` | The name of the continent in which the ad served (derived from country).<br>Corresponds to "Continent" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `COUNTRY_CODE` | The ISO code of the country in which the ad served.<br>Corresponds to "Country code" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `PRIVACY_AND_MESSAGING`, `AD_SPEED`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `COUNTRY_ID` | The criteria ID of the country in which the ad served.<br>Corresponds to "Country ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `PRIVACY_AND_MESSAGING`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `IDENTIFIER` |
| `COUNTRY_NAME` | The name of the country in which the ad served.<br>Corresponds to "Country" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `PRIVACY_AND_MESSAGING`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `CREATIVE_BILLING_TYPE` | Enum value of creative billing type<br>Corresponds to "Creative billing type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_BILLING_TYPE_NAME` | Localized string value of creative billing type<br>Corresponds to "Creative billing type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_CLICK_THROUGH_URL` | Represents the click-through URL of a creative<br>Corresponds to "Creative click through url" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_ID` | The ID of a creative<br>Corresponds to "Creative ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `IDENTIFIER` |
| `CREATIVE_NAME` | Creative name<br>Corresponds to "Creative" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `STRING` |
| `CREATIVE_OR_CREATIVE_SET` | ENUM describing whether the creative is part of a creative set or a normal creative.<br>Corresponds to "Creative or creative set value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_OR_CREATIVE_SET_NAME` | Localized string name of whether the creative is part of a creative set or a normal creative.<br>Corresponds to "Creative or creative set" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_POLICIES_FILTERING` | Creative Policies filtering.<br>Corresponds to "Creative policies filtering value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_POLICIES_FILTERING_NAME` | Localized name of the Creative Policies filtering.<br>Corresponds to "Creative policies filtering" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_PROTECTIONS_FILTERING` | Creative Protections filtering.<br>Corresponds to "Creative protections filtering value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_PROTECTIONS_FILTERING_NAME` | Localized name of the Creative Protections filtering.<br>Corresponds to "Creative protections filtering" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_SET_ROLE_TYPE` | ENUM describing whether the creative is part of a creative set and if so, what its role in the creative set is.<br>Corresponds to "Creative set role type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_SET_ROLE_TYPE_NAME` | Localized name describing whether the creative is part of a creative set and if so, what its role in the creative set is.<br>Corresponds to "Creative set role type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_TARGET_AD_UNIT_SIZE` | The size of the ad unit that the creative is intended to occupy, such as "468 x 60".<br>Corresponds to "Creative target ad unit size" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`<br>Data format: `STRING` |
| `CREATIVE_TECHNOLOGY` | Creative technology ENUM<br>Corresponds to "Creative technology value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CREATIVE_TECHNOLOGY_NAME` | Creative technology localized name<br>Corresponds to "Creative technology" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_THIRD_PARTY_VENDOR` | Third party vendor name of a creative<br>Corresponds to "Creative third party vendor" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_TYPE` | Enum value of creative type<br>Corresponds to "Creative type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `ENUM` |
| `CREATIVE_TYPE_NAME` | Localized string name of creative type<br>Corresponds to "Creative type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `AD_SPEED`<br>Data format: `STRING` |
| `CREATIVE_VENDOR_ID` | Creative vendor ID.<br>Corresponds to "Creative vendor ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CREATIVE_VENDOR_NAME` | Name of the Creative vendor.<br>Corresponds to "Creative vendor" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CREATIVE_VIDEO_REDIRECT_THIRD_PARTY` | The third party where Google Ad Manager was redirected for the creative, based on the domain.<br>Corresponds to "Creative video redirect third party" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CURATOR_ID` | The ID of a Curation partner<br>Corresponds to "Curation partner ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CURATOR_NAME` | The name of a Curation partner<br>Corresponds to "Curation partner" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CUSTOM_EVENT_ID` | Custom event ID<br>Corresponds to "Custom event id" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CUSTOM_EVENT_NAME` | Custom event name<br>Corresponds to "Custom event" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CUSTOM_EVENT_TYPE` | Custom event type<br>Corresponds to "Custom event type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `CUSTOM_EVENT_TYPE_NAME` | Localized name of the custom event type<br>Corresponds to "Custom event type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `CUSTOM_SPOT_ID` | The ID of an ad spot. An ad spot can be added to an ad break template, as well as directly targeted by a video line item.<br>Corresponds to "Custom spot ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `CUSTOM_SPOT_NAME` | The name of an ad spot. An ad spot can be added to an ad break template, as well as directly targeted by a video line item.<br>Corresponds to "Custom spot" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DATE` | Breaks down reporting data by date.<br>Corresponds to "Date" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `PRIVACY_AND_MESSAGING`, `REVENUE_VERIFICATION`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `DATE` |
| `DAY_OF_WEEK` | Breaks down reporting data by day of the week. Monday is 1 and 7 is Sunday.<br>Corresponds to "Day of week" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `PRIVACY_AND_MESSAGING`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `INTEGER` |
| `DEAL_BUYER_ID` | The ID of the buyer of a deal.<br>Corresponds to "Deal buyer ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `DEAL_BUYER_NAME` | The name of the buyer of a deal.<br>Corresponds to "Deal buyer" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DEAL_ID` | Deal ID<br>Corresponds to "Deal ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DEAL_ID_ALL` | List of deal IDs found in a callout.<br>Corresponds to "Deal ID (all)" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING_LIST` |
| `DEAL_NAME` | Deal name<br>Corresponds to "Deal" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DELIVERED_SECURE_SIGNAL_ID` | The ID of the secure signals that were sent to the bidder who won the impression.<br>Corresponds to "Secure signal ID (delivered)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `DELIVERED_SECURE_SIGNAL_NAME` | The name of the secure signals that were sent to the bidder who won the impression.<br>Corresponds to "Secure signal name (delivered)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DEMAND_CHANNEL` | Demand channel.<br>Corresponds to "Demand channel value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `REVENUE_VERIFICATION`, `AD_SPEED`<br>Data format: `ENUM` |
| `DEMAND_CHANNEL_NAME` | Demand channel name.<br>Corresponds to "Demand channel" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `REVENUE_VERIFICATION`, `AD_SPEED`<br>Data format: `STRING` |
| `DEMAND_SOURCE` | Demand source.<br>Corresponds to "Demand source value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `ENUM` |
| `DEMAND_SOURCE_ALL` | List of demand sources found in a callout.<br>Corresponds to "Demand source (all)" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING_LIST` |
| `DEMAND_SOURCE_NAME` | Demand source name.<br>Corresponds to "Demand source" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `DEMAND_SUBCHANNEL` | Demand subchannel.<br>Corresponds to "Demand subchannel value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `ENUM` |
| `DEMAND_SUBCHANNEL_ALL` | List of demand subchannels considered at auction.<br>Corresponds to "Demand subchannel (all)" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING_LIST` |
| `DEMAND_SUBCHANNEL_NAME` | Demand subchannel name.<br>Corresponds to "Demand subchannel" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `DEVICE` | The device on which an ad was served.<br>Corresponds to "Device value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `DEVICE_CATEGORY` | The device category to which an ad is being targeted.<br>Corresponds to "Device category value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `PRIVACY_AND_MESSAGING`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `ENUM` |
| `DEVICE_CATEGORY_NAME` | The name of the category of device (smartphone, feature phone, tablet, or desktop) to which an ad is being targeted.<br>Corresponds to "Device category" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `PRIVACY_AND_MESSAGING`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ON_PLATFORM_MULTICALL`<br>Data format: `STRING` |
| `DEVICE_MANUFACTURER_ID` | Device manufacturer ID<br>Corresponds to "Device manufacturer ID" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `DEVICE_MANUFACTURER_NAME` | Device manufacturer name<br>Corresponds to "Device manufacturer" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DEVICE_MODEL_ID` | Device model ID<br>Corresponds to "Device model ID" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `DEVICE_MODEL_NAME` | Device model name<br>Corresponds to "Device model" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DEVICE_NAME` | The localized name of the device on which an ad was served.<br>Corresponds to "Device" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DSP_SEAT_ID` | The ID of DSP Seat<br>Corresponds to "DSP seat ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `DYNAMIC_ALLOCATION_TYPE` | Categorization of inventory sources based on AdX dynamic allocation backfill type.<br>Corresponds to "Dynamic allocation value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `DYNAMIC_ALLOCATION_TYPE_NAME` | Localized name of the dynamic allocation type.<br>Corresponds to "Dynamic allocation" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ESP_DELIVERY` | Status of Encrypted Signals for Publishers delivery.<br>Corresponds to "Secure signal delivery value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `ESP_DELIVERY_NAME` | Localized name of the ESP delivery status.<br>Corresponds to "Secure signal delivery" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `ESP_PRESENCE` | Whether Encrypted Signals for Publishers are present on the ad request.<br>Corresponds to "Secure signal presence value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `ESP_PRESENCE_NAME` | Localized name of the ESP presence status.<br>Corresponds to "Secure signal presence" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `EXCHANGE_BIDDING_DEAL_ID` | Exchange bidding deal ID.<br>Corresponds to "Exchange bidding deal id" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `EXCHANGE_BIDDING_DEAL_TYPE` | Exchange bidding deal type.<br>Corresponds to "Exchange bidding deal type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `EXCHANGE_BIDDING_DEAL_TYPE_NAME` | Localized name of the exchange bidding deal type.<br>Corresponds to "Exchange bidding deal type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `EXCHANGE_THIRD_PARTY_COMPANY_ID` | ID of the yield partner as classified by Google<br>Corresponds to "Yield partner ID (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `EXCHANGE_THIRD_PARTY_COMPANY_NAME` | Name of the yield partner as classified by Google<br>Corresponds to "Yield partner (classified)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `FIRST_LOOK_PRICING_RULE_ID` | The ID of the first look pricing rule.<br>Corresponds to "First look pricing rule ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `FIRST_LOOK_PRICING_RULE_NAME` | The name of the first look pricing rule.<br>Corresponds to "First look pricing rule" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `FIRST_PARTY_ID_STATUS` | Whether a first-party user identifier was present on a given ad-request.<br>Corresponds to "First-party ID status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `FIRST_PARTY_ID_STATUS_NAME` | The localized name of whether a first-party user identifier was present on a given ad-request.<br>Corresponds to "First-party ID status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `GENDER` | User gender enum value returned from Google Analytics.<br>Corresponds to "Gender value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `GENDER_NAME` | Localized user gender returned from Google Analytics. For example, "male", "female".<br>Corresponds to "Gender" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `GOOGLE_ANALYTICS_STREAM_ID` | The ID of a Google Analytics stream. For example, web site or mobile app<br>Corresponds to "Google Analytics stream ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `GOOGLE_ANALYTICS_STREAM_NAME` | The name of a Google Analytics stream. For example, web site or mobile app.<br>Corresponds to "Google Analytics stream" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `HBT_YIELD_PARTNER_ID` | The ID of the header bidding trafficking yield partner.<br>Corresponds to "Yield partner ID (header bidding trafficking)" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `IDENTIFIER` |
| `HBT_YIELD_PARTNER_NAME` | The name of the header bidding trafficking yield partner.<br>Corresponds to "Yield partner (header bidding trafficking)" in the Ad Manager UI.<br>Compatible with the following report types: `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `HEADER_BIDDER_INTEGRATION_TYPE` | Header Bidder integration type.<br>Corresponds to "Header bidder integration type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `HEADER_BIDDER_INTEGRATION_TYPE_NAME` | Localized name of the Header Bidder integration type.<br>Corresponds to "Header bidder integration type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `HOUR` | Breaks down reporting data by hour in one day.<br>Corresponds to "Hour" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`, `ON_PLATFORM_MULTICALL`<br>Data format: `INTEGER` |
| `IMPRESSION_COUNTING_METHOD` | Impression Counting Method ENUM.<br>Corresponds to "Impression counting method value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `IMPRESSION_COUNTING_METHOD_NAME` | Localized impression counting method name.<br>Corresponds to "Impression counting method" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INTERACTION_TYPE` | The interaction type of an ad.<br>Corresponds to "Interaction type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `INTERACTION_TYPE_NAME` | The localized name of the interaction type of an ad.<br>Corresponds to "Interaction type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INTEREST` | User interest returned from Google Analytics.<br>Corresponds to "Interests" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_FORMAT` | Inventory format. The format of the ad unit (e.g, banner) where the ad was requested.<br>Corresponds to "Inventory format value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `INVENTORY_FORMAT_NAME` | Inventory format name. The format of the ad unit (e.g, banner) where the ad was requested.<br>Corresponds to "Inventory format" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_SHARE_ASSIGNMENT_ID` | The ID of the inventory share assignment.<br>Corresponds to "Inventory share assignment ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `INVENTORY_SHARE_ASSIGNMENT_NAME` | The name of the inventory share assignment.<br>Corresponds to "Inventory share assignment" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_SHARE_OUTCOME` | The result of an inventory share.<br>Corresponds to "Inventory share outcome value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `INVENTORY_SHARE_OUTCOME_NAME` | The localized name of the result of an inventory share.<br>Corresponds to "Inventory share outcome" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_SHARE_PARTNER_AD_SERVER` | The partner ad server of the inventory share.<br>Corresponds to "Inventory share partner ad server value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `INVENTORY_SHARE_PARTNER_AD_SERVER_NAME` | The localized name of the partner ad server.<br>Corresponds to "Inventory share partner ad server" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_SHARE_TARGET_SHARE_PERCENT` | The target share percent of the inventory share assignment<br>Corresponds to "Partner target share percent" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `PERCENT` |
| `INVENTORY_SHARE_TYPE` | The type of the inventory share.<br>Corresponds to "Inventory share type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `ENUM` |
| `INVENTORY_SHARE_TYPE_NAME` | The localized name of the inventory share type.<br>Corresponds to "Inventory share type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `INVENTORY_TYPE` | Inventory type. The kind of web page or device where the ad was requested.<br>Corresponds to "Inventory type (expanded) value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `ENUM` |
| `INVENTORY_TYPE_NAME` | Inventory type name. The kind of web page or device where the ad was requested.<br>Corresponds to "Inventory type (expanded)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `STRING` |
| `IS_ADX_DIRECT` | Whether traffic is Adx Direct.<br>Corresponds to "Is AdX Direct" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `BOOLEAN` |
| `IS_CURATION_TARGETED` | If curation was targeted by the buyer when buying the impression<br>Corresponds to "Is curation targeted" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `BOOLEAN` |
| `IS_DROPPED` | Whether the query was dropped.<br>Corresponds to "Is Dropped" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `BOOLEAN` |
| `IS_FIRST_LOOK_DEAL` | Whether traffic is First Look.<br>Corresponds to "Is First Look" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `BOOLEAN` |
| `KEY_VALUES_ID` | The Custom Targeting Value ID<br>Corresponds to "Key-values ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `IDENTIFIER` |
| `KEY_VALUES_NAME` | The Custom Targeting Value formatted like `{keyName}={valueName}`<br>Corresponds to "Key-values" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `STRING` |
| `KEY_VALUES_SET` | The custom criteria key-values specified in ad requests.<br>Corresponds to "Key-values" in the Ad Manager UI.<br>Compatible with the following report types: <br>Data format: `STRING_LIST` |
| `LINE_ITEM_AGENCY` | The agency of the order associated with the line item.<br>Corresponds to "Line item agency" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_ARCHIVED` | Whether a Line item is archived.<br>Corresponds to "Line item is archived" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `BOOLEAN` |
| `LINE_ITEM_COMPANION_DELIVERY_OPTION` | Line item companion delivery option ENUM value.<br>Corresponds to "Line item companion delivery option value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `ENUM` |
| `LINE_ITEM_COMPANION_DELIVERY_OPTION_NAME` | Localized line item companion delivery option name.<br>Corresponds to "Line item companion delivery option" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_COMPUTED_STATUS` | The computed status of the LineItem.<br>Corresponds to "Line item computed status value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `ENUM` |
| `LINE_ITEM_COMPUTED_STATUS_NAME` | The localized name of the computed status of the LineItem.<br>Corresponds to "Line item computed status" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `LINE_ITEM_CONTRACTED_QUANTITY` | The contracted units bought for the Line item.<br>Corresponds to "Line item contracted quantity" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `INTEGER` |
| `LINE_ITEM_COST_PER_UNIT` | The cost per unit of the Line item.<br>Corresponds to "Line item rate" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `MONEY` |
| `LINE_ITEM_COST_TYPE` | Line item cost type ENUM value.<br>Corresponds to "Line item cost type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `ENUM` |
| `LINE_ITEM_COST_TYPE_NAME` | Localized line item cost type name.<br>Corresponds to "Line item cost type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `LINE_ITEM_CREATIVE_END_DATE` | Represent the end date of a creative associated with line item<br>Corresponds to "Line item creative end date" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `DATE` |
| `LINE_ITEM_CREATIVE_ROTATION_TYPE` | The creative rotation type of the LineItem.<br>Corresponds to "Line item creative rotation type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `ENUM` |
| `LINE_ITEM_CREATIVE_ROTATION_TYPE_NAME` | The localized name of the creative rotation type of the LineItem.<br>Corresponds to "Line item creative rotation type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_CREATIVE_START_DATE` | Represent the start date of a creative associated with line item<br>Corresponds to "Line item creative start date" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`<br>Data format: `DATE` |
| `LINE_ITEM_CURRENCY_CODE` | The 3 letter currency code of the Line Item<br>Corresponds to "Line item currency code" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `LINE_ITEM_DELIVERY_INDICATOR` | The progress made for the delivery of the Line item.<br>Corresponds to "Line item delivery indicator" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `PERCENT` |
| `LINE_ITEM_DELIVERY_RATE_TYPE` | The delivery rate type of the LineItem.<br>Corresponds to "Line item delivery rate type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `ENUM` |
| `LINE_ITEM_DELIVERY_RATE_TYPE_NAME` | The localized name of the delivery rate type of the LineItem.<br>Corresponds to "Line item delivery rate type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `STRING` |
| `LINE_ITEM_DISCOUNT_ABSOLUTE` | The discount of the LineItem in whole units in the LineItem's currency code, or if unspecified the Network's currency code.<br>Corresponds to "Line item discount (absolute)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `MONEY` |
| `LINE_ITEM_DISCOUNT_PERCENTAGE` | The discount of the LineItem in percentage.<br>Corresponds to "Line item discount (percentage)" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `WHOLE_PERCENT` |
| `LINE_ITEM_END_DATE` | The end date of the Line item.<br>Corresponds to "Line item end date" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `DATE` |
| `LINE_ITEM_END_DATE_TIME` | The end date and time of the Line item.<br>Corresponds to "Line item end time" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `TIMESTAMP` |
| `LINE_ITEM_ENVIRONMENT_TYPE` | The ENUM value of the environment a LineItem is targeting.<br>Corresponds to "Line item environment type value" in the Ad Manager UI (when showing API fields).<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `ENUM` |
| `LINE_ITEM_ENVIRONMENT_TYPE_NAME` | The localized name of the environment a LineItem is targeting.<br>Corresponds to "Line item environment type" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_EXTERNAL_DEAL_ID` | The deal ID of the Line item. Set for Programmatic Direct campaigns.<br>Corresponds to "Line item deal ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `IDENTIFIER` |
| `LINE_ITEM_EXTERNAL_ID` | The external ID of the Line item.<br>Corresponds to "Line item external ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_FREQUENCY_CAP` | The frequency cap of the Line item (descriptive string).<br>Corresponds to "Line item frequency cap" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_ID` | Line item ID.<br>Corresponds to "Line item ID" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`, `OFF_PROPERTY_CAMPAIGNS`, `ADS_TRAFFIC_NAVIGATOR`<br>Data format: `IDENTIFIER` |
| `LINE_ITEM_LABELS` | Line item labels.<br>Corresponds to "Line item labels" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING_LIST` |
| `LINE_ITEM_LABEL_IDS` | Line item label IDs.<br>Corresponds to "Line item label IDs" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `IDENTIFIER_LIST` |
| `LINE_ITEM_LAST_MODIFIED_BY_APP` | The application that last modified the Line Item.<br>Corresponds to "Line item last modified by app" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`<br>Data format: `STRING` |
| `LINE_ITEM_LIFETIME_CLICKS` | The total number of clicks delivered of the lifetime of the Line item.<br>Corresponds to "Line item lifetime clicks" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORICAL`, `REACH`, `AD_SPEED`<br>Data format: `INTEGER` |
| `LINE_ITEM_LIFETIME_IMPRESSIONS` | The total number of impressions delivered over the lifetime of the Line item.<br>Corresponds to "Line item lifetime impressions" in the Ad Manager UI.<br>Compatible with the following report types: `HISTORIC