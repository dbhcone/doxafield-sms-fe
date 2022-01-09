const Auth = {
  studentlogin: '/auth/login/student',
  stafflogin: '/auth/login/staff',
  adminlogin: '/auth/login/admin',
  signup: '/auth/create-account',
  activate: '/auth/activate-account',
  allusers: '/auth/all-users',
};

const Academics = {
  addCalendar: '/academics/calendar',
  updateCalendar: '/academics/calendar',
  allCalendars: '/academics/calendars',

  addClass: '/academics/class',
  updateClass: '/academics/class',
  allClasses: '/academics/classes',

  addSubject: '/academics/subject',
  updateSubject: '/academics/subject',
  allSubjects: '/academics/subjects',
};

const Admissions = {
  addAdmission: '/admission',
  updateAdmission: '/admission',
  allAdmissions: '/admissions',
};

const General = {
  contactus: '/contactus',
};

const Events = {
  create: '/events/create-event',
  all: '/events',
  deleteOne: '/events/delete',
};

export { Auth, General, Events, Academics, Admissions };
