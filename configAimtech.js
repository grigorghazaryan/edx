const host = 'https://edxchange-backend.aimtech.am/api/v1';

const config = {
    login: host + '/user/sign-in',

    // Get menus
    getMenus: host + '/menu-list?role_id=', // + role id

    // Allocations
    getAllocationByTitle: 'https://edxchange-allocation.aimtech.am/api/v1/allocations/', // + allocation 
    addAllocation: 'https://edxchange-allocation.aimtech.am/api/v1/allocations/',
    getTemplates: 'https://edxchange-allocation.aimtech.am/api/v1/get-template/', // + title id
    // getBreakdownLogic: 'https://edxchange-allocation.aimtech.am/api/v1/get-breakdown-logic/',

    getSchools: 'https://edxchange-school.aimtech.am/api/v1/school',

    // Get school years
    getSchoolYears: 'https://edxchange-school-year.aimtech.am/api/v1/school-year',

    // School By Year
    getAllocationByYears: 'https://edxchange-allocation.aimtech.am/api/v1/allocations-by-school-year/',
    filterSchool: 'https://edxchange-school.aimtech.am/api/v1/filter-school?search=',
    getSchoolInformationById: 'https://edxchange-school.aimtech.am/api/v1/get-school/', // + id
    addSchoolAddress: 'https://edxchange-school.aimtech.am/api/v1/add-school-address/', // + id
    editSchool: 'https://edxchange-school.aimtech.am/api/v1/school/', // + id
    getAddressTypes: 'https://edxchange-school.aimtech.am/api/v1/get-address-types',
    editAddress: 'https://edxchange-school.aimtech.am/api/v1/edit-address/', // + id
    removeAddress: 'https://edxchange-school.aimtech.am/api/v1/remove-school-address/', // 1/1001

    // GET SCHOOL COMPUS
    getSchoolCompuses: 'https://edxchange-school.aimtech.am/api/v1/get-school-campuses/', // + id
    addCampusAddress: 'https://edxchange-school.aimtech.am/api/v1/add-campus-address/', // 
    removeCampusAddress: 'https://edxchange-school.aimtech.am/api/v1/remove-campus-address/',
    addCampus: 'https://edxchange-school.aimtech.am/api/v1/add-campus/', // + id
    getSchoolContacts: 'https://edxchange-school.aimtech.am/api/v1/get-school-contacts/',
    addSchoolContact: 'https://edxchange-school.aimtech.am/api/v1/add-school-contacts/',
    editSchoolContact: 'https://edxchange-school.aimtech.am/api/v1/edit-school-contacts/',
    deleteSchoolContact: 'https://edxchange-school.aimtech.am/api/v1/remove-school-contact/', // + 17/1001

    // Vendor
    getVendorInformationById: 'https://edxchange-supplier.aimtech.am/api/v1/get-supplier/', // + id
    editVendor: 'https://edxchange-supplier.aimtech.am/api/v1/supplier/', // + id
    addVendorAddress: 'https://edxchange-supplier.aimtech.am/api/v1/add-supplier-address/',
    editVendorAddress: 'https://edxchange-supplier.aimtech.am/api/v1/edit-supplier-address/',
    removeVendorAddress: 'https://edxchange-supplier.aimtech.am/api/v1/remove-supplier-address/',
    //
    getVendorContacts: 'https://edxchange-supplier.aimtech.am/api/v1/get-supplier-contacts/',
    addVendorContact: 'https://edxchange-supplier.aimtech.am/api/v1/add-supplier-contacts/',
    editVendorContact: 'https://edxchange-supplier.aimtech.am/api/v1/edit-supplier-contacts/',
    deleteVendorContact: 'https://edxchange-supplier.aimtech.am/api/v1/remove-supplier-contact/',
    filterVendor: 'https://edxchange-supplier.aimtech.am/api/v1/filter-supplier?search=',


    // Get States
    getStates: 'https://edxchange-school.aimtech.am/api/v1/get-states-list',

    // Supplier
    getAllSuppliers: 'https://edxchange-supplier.aimtech.am/api/v1/all-suppliers',
    getSuppliers: 'https://edxchange-supplier.aimtech.am/api/v1/supplier',
    filterSupplier: 'https://edxchange-supplier.aimtech.am/api/v1/filter-supplier?search=',

    // Search by School Name
    getAllocationsBySchoolName: '',
    getAllocationBar: 'https://edxchange-allocation.aimtech.am/api/v1/allocations-totals/',
    
    // Filter Allocation
    filterAllocation: 'https://edxchange-allocation.aimtech.am/api/v1/filter-allocation/', // 1?search=St&status=fn&year=21

    // INVENTORY

    // Get total cost
    getInventoryTotalCost: 'https://inventory.aimtech.am/api/v1/get-inventory-total-cost/', // + 1/1001 ?schoolYearId=21
    getInventory: 'https://inventory.aimtech.am/api/v1/inventory/',  // + 1/1001
    addInventory: 'https://inventory.aimtech.am/api/v1/inventory',
    getAdditionalInfoForInventory: 'https://inventory.aimtech.am/api/v1/get-supplier-category-status-data',

    // Modify status
    modifyInventoryStatus: 'https://inventory.aimtech.am/api/v1/modify-inventory/', // + id
    
    // Filter Inventory
    filterInventory: 'https://inventory.aimtech.am/api/v1/filter-inventory/', // 1/1001?category=8&supplier=1002&status=1&condition=1&search=School

    // License
    getLicense: 'https://inventory.aimtech.am/api/v1/license', // + id
    getTotalLicense: 'https://inventory.aimtech.am/api/v1/license-total/', // + school id

    // Activity
    // getActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity/', // + 1 / 1001,
    getActivity: 'https://edxchange-activity.aimtech.am/api/v1/item/', // + 1/1001/ if activity : 1 , if material : 2, ...,
    getAttendeesById: 'https://edxchange-activity.aimtech.am/api/v1/get-atendee/', // + id
    getCategoryTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-types-categories/', // + 1 ? Title 1
    getAllCategories: 'https://edxchange-activity.aimtech.am/api/v1/get-all-categories', 
    editActivity: 'https://edxchange-activity.aimtech.am/api/v1/item/', // + id
    // editActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity/', // + id
    // addActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity',
    addActivity: 'https://edxchange-activity.aimtech.am/api/v1/item/', // + if activity : 1 , if material : 2, ...,
    deleteActivity: 'https://edxchange-activity.aimtech.am/api/v1/remove-item/', // + id
    getApprovals: 'https://edxchange-activity.aimtech.am/api/v1/get-approval',
    getActivityBar: 'https://edxchange-activity.aimtech.am/api/v1/activity-totals/', // + 1 / + 1001
    getRcurranceTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-recurrance-types',
    getSchedules: 'https://edxchange-activity.aimtech.am/api/v1/get-schedule/', // + id
    addSchedule: 'https://edxchange-activity.aimtech.am/api/v1/add-schedule/', // + id
    editSchedule: 'https://edxchange-activity.aimtech.am/api/v1/edit-schedule/', // + 101/336
    removeSchedule: 'https://edxchange-activity.aimtech.am/api/v1/remove-schedule/', // + id
    removeAttendee: 'https://edxchange-activity.aimtech.am/api/v1/remove-attendy/', // + id,
    addAttendee: 'https://edxchange-activity.aimtech.am/api/v1/add-attendy/', // + id
    filterActivity: 'https://edxchange-activity.aimtech.am/api/v1/filter-budget/', // 1/1001/ if activity : 1 , if material : 2 ?search=test&type=1&year=1015
    getSubcategories: 'https://edxchange-activity.aimtech.am/api/v1/get-types-subcategories/', // + title id
    
    
    // Get attendee types
    getAtendeeTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-atendee-types', 
    getAttendyParticipant: 'https://edxchange-activity.aimtech.am/api/v1/get-attendy-participiant/', // + id
    deleteAttendyParticipant: 'https://edxchange-activity.aimtech.am/api/v1/remove-attendy-parties/', // + 24/318,
    addParticipant: 'https://edxchange-activity.aimtech.am/api/v1/add-participant/', // + 1001/318
    addNewParticipant: 'https://edxchange-activity.aimtech.am/api/v1/add-participant-and-assign-to-activity/', // + 1001/318,
    searchParticipant: 'https://edxchange-activity.aimtech.am/api/v1/search-attendy-participant/', // 1001?searchParties=test

    getFunds: 'https://edxchange-activity.aimtech.am/api/v1/get-fund-source/',
    
    // GET CAMPUSES
    getCampuses: 'https://edxchange-school.aimtech.am/api/v1/get-school-campus-list/', // + school id
    // TRACKING CATEGORY
    getTrackingCategories: 'https://edxchange-activity.aimtech.am/api/v1/get-item-category-tracking/', // Title1 / CategoryId
    // INVENTORY CATEGORIES
    getInventoryCategories: 'https://edxchange-activity.aimtech.am/api/v1/get-inventory-category-type',

    // allocation fund id
    allocationFundId: 'https://edxchange-activity.aimtech.am/api/v1/get-fund-source-id/', // title id / 1 - pd / 2 - fe / 3 - inst / 4 - material
    getBudgetBalance: 'https://edxchange-activity.aimtech.am/api/v1/get-budget-balance/', // allocationFundId/ tab /school id

    // TEACHERS
    getTeachersData: 'https://edxchange-teacher.aimtech.am/api/v1/teacher',
    getTeachers: 'https://edxchange-teacher.aimtech.am/api/v1/teacher?pagination=0',
    getTeacherBudget: 'https://edxchange-activity.aimtech.am/api/v1/get-teacher-budget-list/', // title id + school id
    getTeacherTotalBar: 'https://edxchange-activity.aimtech.am/api/v1/get-teacher-totals/', // 1/1001/3 
    createTeacherAssignment: 'https://edxchange-teacher.aimtech.am/api/v1/create-teacher-assignment/',
    addTeacherBudget: 'https://edxchange-activity.aimtech.am/api/v1/add-teacher-budget/',
    editTeacherAssignment: 'https://edxchange-activity.aimtech.am/api/v1/edit-teacher-assignment/',
    addTeacherAssignment: 'https://edxchange-activity.aimtech.am/api/v1/add-teacher-assignment/',
    deleteTeacher: 'https://edxchange-activity.aimtech.am/api/v1/remove-teacher-assignment/',

    // getTeacherBudgetById: 'https://edxchange-activity.aimtech.am/api/v1/get-teacher-assignment-details/', // + budget id
    getTeacherBudgetById: 'https://edxchange-teacher.aimtech.am/api/v1/get-teacher-compensation/', // + budget id
    getRoleTypes: 'https://edxchange-teacher.aimtech.am/api/v1/get-teacher-role-type',
    getEmployementTypes: 'https://edxchange-teacher.aimtech.am/api/v1/get-teacher-employement-type',
    fringeTypes: 'https://edxchange-teacher.aimtech.am/api/v1/get-fring',
    paySchedule: 'https://edxchange-teacher.aimtech.am/api/v1/count-shceduled-pay/', // startDate / endDate / chargeRate / employeeType / weekHourse / billingCicle === 1 
    filterTeacher: 'https://edxchange-teacher.aimtech.am/api/v1/filter-teacher-assignment/', // 1/1001?search=Joelle&school_year=1015


    // INVOICE
    
    getInvoices: 'https://edxchange-invoice.aimtech.am/api/v1/item',
    getTerms: 'https://edxchange-invoice.aimtech.am/api/v1/invoice-term',
    deleteInvoice: 'https://edxchange-invoice.aimtech.am/api/v1/remove-invoice/',
    editInvoice: 'https://edxchange-invoice.aimtech.am/api/v1/edit-invoice/', 
    addInvoice: 'https://edxchange-invoice.aimtech.am/api/v1/add-invoice/',
    getInvoiceTotals: 'https://edxchange-statistic.aimtech.am/api/v1/get-invoice-totals',
    filterInvoice: 'https://edxchange-invoice.aimtech.am/api/v1/filter-invoice',

    // Reconciliation
    getReconciliation: 'https://edxchange-invoice.aimtech.am/api/v1/reconciliation-item',
    deleteReconciliation: 'https://edxchange-invoice.aimtech.am/api/v1/remove-reconciliation/',
    editReconciliation: 'https://edxchange-invoice.aimtech.am/api/v1/edit-reconciliation/', 
    addReconciliation: 'https://edxchange-invoice.aimtech.am/api/v1/add-reconciliation/',

    filterReconciliation: 'https://edxchange-invoice.aimtech.am/api/v1/filter-reconciliation',
    getReconciliationBudgetItems: 'https://edxchange-invoice.aimtech.am/api/v1/get-reconciliation-budget-list/',
    addReconciliationBudgetItems: 'https://edxchange-invoice.aimtech.am/api/v1/add-reconciliation-budget-items/',
    

    getBudgetItems: 'https://edxchange-invoice.aimtech.am/api/v1/get-budget-list/', // + id
    addSelected: 'https://edxchange-invoice.aimtech.am/api/v1/add-budget-items/', // + 1 title 1



    // GET ALLOCATIONS
    getAllocations: 'https://edxchange-allocation.aimtech.am/api/v1/get-allocation-type',
    getFundSourceByTitleId: 'https://edxchange-activity.aimtech.am/api/v1/get-fund-source/', // + title id
    getInvoiceStatus: 'https://edxchange-invoice.aimtech.am/api/v1/invoice-status',
    deleteBudget: 'https://edxchange-invoice.aimtech.am/api/v1/remove-budget-item/', // + id

    

    // Categories
    getAllCategories: 'https://edxchange-activity.aimtech.am/api/v1/get-all-categories',
    getAllSubcategories: 'https://edxchange-activity.aimtech.am/api/v1/get-all-subcategories',
    getAllFunds: 'https://edxchange-activity.aimtech.am/api/v1/get-all-fundsources',

    // Document
    // Document trays
    getDocumentTrays: 'https://edxchange-document.aimtech.am/api/v1/document-tray',
    getTrackingStatus: 'https://edxchange-document.aimtech.am/api/v1/tracking-status/', // + id
    getDocumentsStatus: 'https://edxchange-document.aimtech.am/api/v1/document-status',
    getTrackingStatusByCategory: 'https://edxchange-document.aimtech.am/api/v1/get-tracking-status/', // + category id
    documentsByTray: 'https://edxchange-document.aimtech.am/api/v1/documents-by-tray/', // + id + id
    getDocumentCategory: 'https://edxchange-document.aimtech.am/api/v1/document-category',
    addDocument: 'https://edxchange-document.aimtech.am/api/v1/add-document/', // + id + id
    addDocumentToExistingItem: 'https://edxchange-document.aimtech.am/api/v1/add-document-to-existing-item/',
    deleteDocument: 'https://edxchange-document.aimtech.am/api/v1/remove-document/', // + doc id
    addTrackingStatus: 'https://edxchange-document.aimtech.am/api/v1/add-tracking-status/', // id
    addTrackingNote: 'https://edxchange-document.aimtech.am/api/v1/add-note/', 

    // Activity Tracking
    getActivityTrackings: 'https://edxchange-document.aimtech.am/api/v1/activity-tracking',
    // Activity Status
    getActivityTypes: 'https://edxchange-activity.aimtech.am/api/v1/online-status',
    getActivityStatus: 'https://edxchange-activity.aimtech.am/api/v1/get-item-status/',
    
    // Get statuses
    getStatuses: 'https://edxchange-activity.aimtech.am/api/v1/get-statuses?',

    // Tag
    searchTag: 'https://edxchange-document.aimtech.am/api/v1/find-tag?name=',
    documentByTagId: 'https://edxchange-document.aimtech.am/api/v1/get-document-by-tag?tagIds=', // 1,2,3,4


    // GET UNITS
    getUnits: 'https://edxchange-activity.aimtech.am/api/v1/get-unity',
    
    // ITEMIZATION
    getItemizationLists: 'https://edxchange-activity.aimtech.am/api/v1/get-breakdown/', // + id
    getItemizationListsForInventory: 'https://edxchange-activity.aimtech.am/api/v1/get-breakdown-inventory/', // + id
    addItemizationItem: 'https://edxchange-activity.aimtech.am/api/v1/add-budget-breakdown/', // + id
    deleteItemizationItem: 'https://edxchange-activity.aimtech.am/api/v1/remove-budget-item/', // + id
    addItemToInventory: 'https://edxchange-activity.aimtech.am/api/v1/add-item-to-inventory/', // + id
}

export default config