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

    

}

export default config