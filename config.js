const host = 'https://edxchange-backend.aimtech.am/api/v1';

const config = {
    login: host + '/user/sign-in',

    // Get menus
    getMenus: host + '/menu-list?role_id=', // + role id

    // Allocations
    getAllocationByTitle: 'https://edxchange-allocation.aimtech.am/api/v1/allocations/', // + allocation 
    addAllocation: 'https://edxchange-allocation.aimtech.am/api/v1/allocations',

    getSchools: 'https://edxchange-school.aimtech.am/api/v1/school',

    // Get school years
    getSchoolYears: 'https://edxchange-school-year.aimtech.am/api/v1/school-year',

    // School By Year
    getAllocationByYears: 'https://edxchange-allocation.aimtech.am/api/v1/allocations-by-school-year/',

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
    getActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity/', // + 1 / 1001,
    getAttendeesById: 'https://edxchange-activity.aimtech.am/api/v1/get-atendee/', // + id
    getCategoryTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-types-categories/', // + 1 ? Title 1
    editActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity/', // + id
    addActivity: 'https://edxchange-activity.aimtech.am/api/v1/activity',
    deleteActivity: 'https://edxchange-activity.aimtech.am/api/v1/remove-activity/', // + id
    getApprovals: 'https://edxchange-activity.aimtech.am/api/v1/get-approval',
    getActivityBar: 'https://edxchange-activity.aimtech.am/api/v1/activity-totals/', // + 1 / + 1001
    getRcurranceTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-recurrance-types',
    getSchedules: 'https://edxchange-activity.aimtech.am/api/v1/get-schedule/', // + id
    addSchedule: 'https://edxchange-activity.aimtech.am/api/v1/add-schedule/', // + id
    removeSchedule: 'https://edxchange-activity.aimtech.am/api/v1/remove-schedule/', // + id
    removeAttendee: 'https://edxchange-activity.aimtech.am/api/v1/remove-attendy/', // + id,
    addAttendee: 'https://edxchange-activity.aimtech.am/api/v1/add-attendy/', // + id
    filterActivity: 'https://edxchange-activity.aimtech.am/api/v1/filter-activity/', // 1/1001?search=test&type=1&year=1015
    // Get attendee types
    getAtendeeTypes: 'https://edxchange-activity.aimtech.am/api/v1/get-atendee-types', 
}

export default config