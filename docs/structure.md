# Bsa CoreUI Components Documentation

## 📋 Package Structure

```
src
|-- components
|   |-- base  → generic and reusable components
|   |   |-- buttons
|   |   |   |-- BsaButtonBadge.vue
|   |   |   |-- BsaButtonDefault.vue
|   |   |   |-- BsaButtonIcon.vue
|   |   |   +-- BsaButtonPanel.vue
|   |   |-- icons
|   |   |   |-- BsaIcons.vue
|   |   |   +-- iconsMap.ts
|   |   |-- index.ts  → exports all modules from the package
|   |   |-- inputs
|   |   |   |-- BsaInputDate.vue  → Optionally, PrimeVue Calendar
|   |   |   |-- BsaInputSearch.vue
|   |   |   |-- BsaInputSelect.vue
|   |   |   +-- BsaInputText.vue
|   |   |-- loading
|   |   |   +-- BsaLoading.vue
|   |   +-- modals
|   |       +-- BsaModalDialog.vue  → Optionally, PrimeVue Dialog
|   |-- form  → specific form components
|   |   |-- BsaForm.vue  → main container of the form
|   |   |-- BsaFormFooter.vue
|   |   |-- BsaFormHeader.vue
|   |   |-- BsaFormRegister.vue
|   |   |-- BsaFormRow.vue
|   |   |-- form.types.ts  → TypeScript types for props and emits
|   |   +-- index.ts  → exports all modules from the package
|   |-- index.ts  → exports all modules from the package
|   |-- layout  → visual structure components
|   |   |-- BsaCard.vue
|   |   |-- BsaContainer.vue
|   |   |-- BsaSection.vue
|   |   +-- index.ts  → exports all modules from the package
|   +-- table  → DataTable and actions
|       |-- BsaDataTable.vue  → Using PrimeVue DataTable
|       |-- BsaTableActions.vue
|       |-- index.ts  → exports all modules from the package
|       +-- table.types.ts
|-- composables
|   |-- crud
|   |   |-- useCrud.ts
|   |   +-- useCrudPagination.ts
|   |-- form  → specific form components
|   |   |-- useFormModel.ts
|   |   +-- useFormValidation.ts
|   |-- modal
|   |   +-- useModal.ts
|   +-- table  → DataTable and actions
|       |-- useTableFilters.ts
|       +-- useTablePersistence.ts
|-- index.ts  → exports all modules from the package
|-- styles
|   |-- base.scss
|   |-- core-ui.scss
|   |-- dark-mode-comprehensive.scss
|   |-- datatable-dark.scss
|   |-- mixins.scss
|   |-- tailwind.css
|   |-- utilities.scss
|   +-- variables.scss
|-- types  → global types and interfaces of the package
|   +-- common.ts
+-- utils
    |-- formatters
    |   |-- currencyFormatter.ts
    |   |-- dateFormatter.ts
    |   +-- stringFormatter.ts
    +-- validators
        |-- fieldValidators.ts
        +-- formValidators.ts
```
