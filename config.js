// const host = 'https://edxchange-backend.aimtech.am/api/v1';

const config = {
    login: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/edxchnage/public/index.php/api/v1/user/sign-in',

    // Get menus
    // getMenus: host + '/menu-list?role_id=', // + role id

    // Allocations
    getAllocationByTitle: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/allocations/', // + allocation
    addAllocation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/allocations',
    getTemplates: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/get-template/', // + title id
    // getBreakdownLogic: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/get-breakdown-logic/',

    getSchools: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/school',

    // Get school years
    getSchoolYears: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school-year/public/index.php/api/v1/school-year',

    // School By Year
    getAllocationByYears: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/allocations-by-school-year/',
    filterSchool: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/filter-school?search=',
    getSchoolInformationById: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-school/', // + id
    addSchoolAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/add-school-address/', // + id
    editSchool: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/school/', // + id
    getAddressTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-address-types',
    editAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/edit-address/', // + id
    removeAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/remove-school-address/', // 1/1001

    // GET SCHOOL COMPUS
    getSchoolCompuses: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-school-campuses/', // + id
    addCampusAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/add-campus-address/', //
    removeCampusAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/remove-campus-address/',
    addCampus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/add-campus/', // + id
    getSchoolContacts: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-school-contacts/',
    addSchoolContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/add-school-contacts/',
    editSchoolContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/edit-school-contacts/',
    deleteSchoolContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/remove-school-contact/', // + 17/1001

    // Vendor
    getVendorInformationById: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/get-supplier/', // + id
    editVendor: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/supplier/', // + id
    addVendorAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/add-supplier-address/',
    editVendorAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/edit-supplier-address/',
    removeVendorAddress: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/remove-supplier-address/',
    //
    getVendorContacts: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/get-supplier-contacts/',
    addVendorContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/add-supplier-contacts/',
    editVendorContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/edit-supplier-contacts/',
    deleteVendorContact: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/remove-supplier-contact/',
    filterVendor: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/filter-supplier?search=',


    // Get States
    getStates: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-states-list',

    // Supplier
    getAllSuppliers: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/all-suppliers',
    getSuppliers: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/supplier',
    filterSupplier: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/supplier/public/index.php/api/v1/filter-supplier?search=',

    // Search by School Name
    getAllocationsBySchoolName: '',
    getAllocationBar: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/allocations-totals/',

    // Filter Allocation
    filterAllocation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/filter-allocation/', // 1?search=St&status=fn&year=21

    // INVENTORY

    // Get total cost
    getInventoryTotalCost: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/get-inventory-total-cost/', // + 1/1001 ?schoolYearId=21
    getInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/inventory/',  // + 1/1001
    addInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/inventory',
    getAdditionalInfoForInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/get-supplier-category-status-data',

    // Modify status
    modifyInventoryStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/modify-inventory/', // + id

    // Filter Inventory
    filterInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/filter-inventory/', // 1/1001?category=8&supplier=1002&status=1&condition=1&search=School

    // License
    getLicense: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/license', // + id
    getTotalLicense: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/license-total/', // + school id
    getLicenseStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/license-status',
    filterLicense: 'http://ec2-18-223-182-127.us-east-2.compute.amazonaws.com/inventory/public/index.php/api/v1/filter-license/', 

    // Activity
    // getActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/activity/', // + 1 / 1001,
    getActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/item/', // + 1/1001/ if activity : 1 , if material : 2, ...,
    getAttendeesById: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-atendee/', // + id
    getCategoryTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-types-categories/', // + 1 ? Title 1
    //getAllCategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-all-categories',
    editActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/item/', // + id
    // editActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/activity/', // + id
    // addActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/activity',
    addActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/item/', // + if activity : 1 , if material : 2, ...,
    deleteActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-item/', // + id
    getApprovals: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-approval',
    getActivityBar: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/activity-totals/', // + 1 / + 1001
    getRcurranceTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-recurrance-types',
    getSchedules: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-schedule/', // + id
    addSchedule: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-schedule/', // + id
    editSchedule: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/edit-schedule/', // + 101/336
    removeSchedule: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-schedule/', // + id
    removeAttendee: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-attendy/', // + id,
    addAttendee: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-attendy/', // + id
    filterActivity: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/filter-budget/', // 1/1001/ if activity : 1 , if material : 2 ?search=test&type=1&year=1015
    getSubcategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-types-subcategories/', // + title id


    // Get attendee types
    getAtendeeTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-atendee-types',
    getAttendyParticipant: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-attendy-participiant/', // + id
    deleteAttendyParticipant: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-attendy-parties/', // + 24/318,
    addParticipant: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-participant/', // + 1001/318
    addNewParticipant: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-participant-and-assign-to-activity/', // + 1001/318,
    searchParticipant: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/search-attendy-participant/', // 1001?searchParties=test

    getFunds: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-fund-source/',

    // GET CAMPUSES
    getCampuses: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/school/public/index.php/api/v1/get-school-campus-list/', // + school id
    // TRACKING CATEGORY
    getTrackingCategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-item-category-tracking/', // Title1 / CategoryId
    // INVENTORY CATEGORIES
    getInventoryCategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-inventory-category-type',

    // allocation fund id
    allocationFundId: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-fund-source-id/', // title id / 1 - pd / 2 - fe / 3 - inst / 4 - material
    getBudgetBalance: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-budget-balance/', // allocationFundId/ tab /school id

    // TEACHERS
    getTeachersData: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/teacher',
    getTeachers: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/teacher?pagination=0',
    getTeacherBudget: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-teacher-budget-list/', // title id + school id
    //getTeacherTotalBar: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-teacher-totals/', // 1/1001/3
    getTeacherTotalBar: 'https://edxchange-activity.aimtech.am/api/v1/get-teacher-totals/', // 1/1001/3
    createTeacherAssignment: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/create-teacher-assignment/',
    addTeacherBudget: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-teacher-budget/',
    editTeacherAssignment: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/edit-teacher-assignment/',
    addTeacherAssignment: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-teacher-assignment/',
    deleteTeacher: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-teacher-assignment/',

    // getTeacherBudgetById: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-teacher-assignment-details/', // + budget id
    getTeacherBudgetById: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/get-teacher-compensation/', // + budget id
    getRoleTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/get-teacher-role-type',
    getEmployementTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/get-teacher-employement-type',
    fringeTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/get-fring',
    paySchedule: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/count-shceduled-pay/', // startDate / endDate / chargeRate / employeeType / weekHourse / billingCicle === 1
    filterTeacher: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/teacher/public/index.php/api/v1/filter-teacher-assignment/', // 1/1001?search=Joelle&school_year=1015


    // INVOICE

    getInvoices: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/item',
    getTerms: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/invoice-term',
    deleteInvoice: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/remove-invoice/',
    editInvoice: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/edit-invoice/',
    addInvoice: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/add-invoice/',
    getInvoiceTotals: 'https://edxchange-statistic.aimtech.am/api/v1/get-invoice-totals',
    filterInvoice: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/filter-invoice',

    // Reconciliation
    getReconciliation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/reconciliation-item',
    deleteReconciliation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/remove-reconciliation/',
    editReconciliation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/edit-reconciliation/',
    addReconciliation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/add-reconciliation/',

    filterReconciliation: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/filter-reconciliation',
    getReconciliationBudgetItems: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/get-reconciliation-budget-list/',
    addReconciliationBudgetItems: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/add-reconciliation-budget-items/',


    getBudgetItems: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/get-budget-list/', // + id
    addSelected: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/add-budget-items/', // + 1 title 1



    // GET ALLOCATIONS
    getAllocations: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/allocation/public/index.php/api/v1/get-allocation-type',
    getFundSourceByTitleId: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-fund-source/', // + title id
    getInvoiceStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/invoice-status',
    deleteBudget: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/invoice/public/index.php/api/v1/remove-budget-item/', // + id



    // Categories
    getAllCategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-all-categories',
    getAllSubcategories: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-all-subcategories',
    getAllFunds: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-all-fundsources',

    // Document
    // Document trays
    getDocumentTrays: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/document-tray',
    getTrackingStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/tracking-status/', // + id
    getDocumentsStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/document-status',
    getTrackingStatusByCategory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/get-tracking-status/', // + category id
    documentsByTray: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/documents-by-tray/', // + id + id
    getDocumentCategory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/document-category',
    addDocument: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/add-document/', // + id + id
    addDocumentToExistingItem: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/add-document-to-existing-item/',
    deleteDocument: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/remove-document/', // + doc id
    addTrackingStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/add-tracking-status/', // id
    addTrackingNote: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/add-note/',

    // Activity Tracking
    getActivityTrackings: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/activity-tracking',
    // Activity Status
    getActivityTypes: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/online-status',
    getActivityStatus: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-item-status/',

    // Get statuses
    getStatuses: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-statuses?',

    // Tag
    searchTag: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/find-tag?name=',
    documentByTagId: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/document-upload/public/index.php/api/v1/get-document-by-tag?tagIds=', // 1,2,3,4


    // GET UNITS
    getUnits: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-unity',

    // ITEMIZATION
    getItemizationLists: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-breakdown/', // + id
    getItemizationListsForInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-breakdown-inventory/', // + id
    addItemizationItem: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-budget-breakdown/', // + id
    deleteItemizationItem: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/remove-budget-item/', // + id
    addItemToInventory: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/add-item-to-inventory/', // + id


    // GET HOLIDAYS
    getHolidays: 'http://ec2-18-222-66-113.us-east-2.compute.amazonaws.com/budget/public/index.php/api/v1/get-holidays',
    
}

export default config
