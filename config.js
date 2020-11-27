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
}

export default config