import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Assignment = {
  __typename?: 'Assignment';
  class: Class;
  classId: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  feedback?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  quiz: Quiz;
  quizId: Scalars['String']['output'];
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type AssignmentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  quizId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type AssignmentPagination = {
  __typename?: 'AssignmentPagination';
  items: Array<Assignment>;
  meta: PaginationMeta;
};

export type AssignmentQueryParams = {
  filters?: InputMaybe<AssignmentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type Calendar = {
  __typename?: 'Calendar';
  class: Class;
  classId: Scalars['String']['output'];
  className: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  courseName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  method: ClassMethod;
  startTime: Scalars['String']['output'];
  status: CourseStatus;
  tutor?: Maybe<User>;
  tutorId?: Maybe<Scalars['String']['output']>;
  tutorName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CalendarQueryParams = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ChargeInput = {
  amount: Scalars['Float']['input'];
  paymentMethodId: Scalars['String']['input'];
};

export type Class = {
  __typename?: 'Class';
  address?: Maybe<Scalars['String']['output']>;
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  method: ClassMethod;
  name: Scalars['String']['output'];
  occupiedSlots: Scalars['Float']['output'];
  schedule: Array<ScheduleTime>;
  totalSlots: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClassFilterParams = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export enum ClassMethod {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type ClassQueryParams = {
  filters?: InputMaybe<ClassFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type Course = {
  __typename?: 'Course';
  address?: Maybe<Scalars['String']['output']>;
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  endDate: Scalars['Date']['output'];
  fee: Scalars['Float']['output'];
  grade: Grade;
  gradeId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublished: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  objectives?: Maybe<Array<Scalars['String']['output']>>;
  paymentDate?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  startDate: Scalars['Date']['output'];
  status: CourseStatus;
  subject: Subject;
  subjectId: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CourseFilterParams = {
  gradeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<CourseStatus>>;
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CourseQueryParams = {
  filters?: InputMaybe<CourseFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum CourseStatus {
  Ended = 'ENDED',
  InProgress = 'IN_PROGRESS',
  UpComing = 'UP_COMING'
}

export type CoursesPagination = {
  __typename?: 'CoursesPagination';
  items: Array<Course>;
  meta: PaginationMeta;
};

export type CreateClassInput = {
  courseId: Scalars['String']['input'];
  method: ClassMethod;
  name: Scalars['String']['input'];
  schedule: Array<ScheduleTimeInput>;
  totalSlots: Scalars['Int']['input'];
};

export type CreateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  fee: Scalars['Float']['input'];
  gradeId: Scalars['ID']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  paymentDate: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  subjectId: Scalars['ID']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEnrolmentInput = {
  classId: Scalars['ID']['input'];
};

export type CreateGradeInput = {
  name: Scalars['String']['input'];
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateQuizInput = {
  classId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  courseId: Scalars['ID']['input'];
  endTime: Scalars['DateTime']['input'];
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateSubjectInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateTutorReportInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  reason: Scalars['String']['input'];
  tutorId: Scalars['String']['input'];
};

export type CreateTutorRequestInput = {
  cv: Scalars['String']['input'];
};

export type CreateTutorReviewInput = {
  comment: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating: Scalars['Float']['input'];
  tutorId: Scalars['String']['input'];
};

export type Enrolment = {
  __typename?: 'Enrolment';
  class: Class;
  classId: Scalars['ID']['output'];
  course: Course;
  courseId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isFinished: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type EnrolmentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<CourseStatus>>;
};

export type EnrolmentQueryParams = {
  filters?: InputMaybe<EnrolmentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type EnrolmentsPagination = {
  __typename?: 'EnrolmentsPagination';
  items: Array<Enrolment>;
  meta: PaginationMeta;
};

export type FeedbackAssignmentInput = {
  feedback: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Grade = {
  __typename?: 'Grade';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GradePagination = {
  __typename?: 'GradePagination';
  items: Array<Grade>;
  meta: PaginationMeta;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  charge: Payment;
  createClass: Class;
  createCourse: Course;
  createEnrolment: Enrolment;
  createGrade: Grade;
  createQuiz: Quiz;
  createSubject: Subject;
  createTutorReport: TutorReport;
  createTutorRequest: TutorRequest;
  createTutorReview: TutorReview;
  deleteUser: Scalars['Boolean']['output'];
  feedbackAssignment: Assignment;
  login: LoginOutput;
  loginAdmin: LoginOutput;
  logout: Scalars['Boolean']['output'];
  publishCourse: Course;
  refreshToken: Scalars['String']['output'];
  register: User;
  removeClass: Scalars['Boolean']['output'];
  removeCourse: Scalars['Boolean']['output'];
  removeEnrolment: Scalars['Boolean']['output'];
  removeGrade: Grade;
  removePayment: Payment;
  removeQuiz: Scalars['Boolean']['output'];
  removeSubject: Scalars['Boolean']['output'];
  removeTutorRequest: Scalars['Boolean']['output'];
  removeTutorReview: Scalars['Boolean']['output'];
  submitAssignment: Assignment;
  updateBlockStatusUser: Scalars['Boolean']['output'];
  updateClass: Class;
  updateCourse: Course;
  updateGrade: Grade;
  updateQuiz: Quiz;
  updateSubject: Subject;
  updateTutorDetail: TutorDetail;
  updateTutorRequest: TutorRequest;
  updateTutorRequestStatus: TutorRequest;
  updateTutorReview: TutorReview;
};


export type MutationChargeArgs = {
  chargeInput: ChargeInput;
};


export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateEnrolmentArgs = {
  input: CreateEnrolmentInput;
};


export type MutationCreateGradeArgs = {
  input: CreateGradeInput;
};


export type MutationCreateQuizArgs = {
  input: CreateQuizInput;
};


export type MutationCreateSubjectArgs = {
  input: CreateSubjectInput;
};


export type MutationCreateTutorReportArgs = {
  createTutorReportInput: CreateTutorReportInput;
};


export type MutationCreateTutorRequestArgs = {
  input: CreateTutorRequestInput;
};


export type MutationCreateTutorReviewArgs = {
  input: CreateTutorReviewInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFeedbackAssignmentArgs = {
  input: FeedbackAssignmentInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginAdminArgs = {
  input: LoginInput;
};


export type MutationPublishCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSubjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitAssignmentArgs = {
  input: SubmitAssignmentInput;
};


export type MutationUpdateBlockStatusUserArgs = {
  input: UpdateBlockStatusUserInput;
};


export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateGradeArgs = {
  input: UpdateGradeInput;
};


export type MutationUpdateQuizArgs = {
  input: UpdateQuizInput;
};


export type MutationUpdateSubjectArgs = {
  input: UpdateSubjectInput;
};


export type MutationUpdateTutorDetailArgs = {
  input: UpdateTutorDetailInput;
};


export type MutationUpdateTutorRequestArgs = {
  input: UpdateTutorRequestInput;
};


export type MutationUpdateTutorRequestStatusArgs = {
  input: UpdateTutorRequestStatusInput;
};


export type MutationUpdateTutorReviewArgs = {
  input: UpdateTutorReviewInput;
};

export type PaginateOptions = {
  /** Default value is 20 */
  limit: Scalars['Int']['input'];
  /** Default value is 1 */
  page: Scalars['Int']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float']['output'];
  itemCount: Scalars['Float']['output'];
  itemsPerPage: Scalars['Float']['output'];
  totalItems: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paidAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  assignment: Assignment;
  assignments: AssignmentPagination;
  assignmentsWithoutPagination: Array<Assignment>;
  calendar: Calendar;
  calendars: Array<Calendar>;
  classes: Array<Class>;
  course: Course;
  courses: CoursesPagination;
  enrolment: Enrolment;
  enrolments: EnrolmentsPagination;
  getClass: Class;
  getMe: User;
  getUser: User;
  getUsers: UserPagination;
  grade: Grade;
  grades: GradePagination;
  isEnrolled: Scalars['Boolean']['output'];
  myAssignments: AssignmentPagination;
  myCalendars: Array<Calendar>;
  myEnrolmentByCourse: Enrolment;
  myEnrolments: EnrolmentsPagination;
  payment: Payment;
  payments: Array<Payment>;
  quiz: Quiz;
  quizzes: QuizPagination;
  subject: Subject;
  subjects: SubjectPagination;
  tutorDetail: TutorDetail;
  tutorReport: TutorReport;
  tutorReports: TutorReportPagination;
  tutorRequest: TutorRequest;
  tutorRequests: TutorRequestPagination;
  tutorReview: TutorReview;
  tutorReviews: TutorReviewPagination;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssignmentsArgs = {
  queryParams: AssignmentQueryParams;
};


export type QueryAssignmentsWithoutPaginationArgs = {
  queryParams: AssignmentFilterParams;
};


export type QueryCalendarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalendarsArgs = {
  queryParams?: InputMaybe<CalendarQueryParams>;
};


export type QueryClassesArgs = {
  queryParams: ClassQueryParams;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  queryParams: CourseQueryParams;
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrolmentsArgs = {
  queryParams?: InputMaybe<EnrolmentQueryParams>;
};


export type QueryGetClassArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersArgs = {
  queryParams: UserQueryParams;
};


export type QueryGradeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGradesArgs = {
  queryParams: QueryParams;
};


export type QueryIsEnrolledArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryMyAssignmentsArgs = {
  queryParams: AssignmentQueryParams;
};


export type QueryMyCalendarsArgs = {
  queryParams?: InputMaybe<CalendarQueryParams>;
};


export type QueryMyEnrolmentByCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryMyEnrolmentsArgs = {
  queryParams?: InputMaybe<EnrolmentQueryParams>;
};


export type QueryPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuizzesArgs = {
  queryParams: QuizQueryParams;
};


export type QuerySubjectArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubjectsArgs = {
  queryParams: QueryParams;
};


export type QueryTutorDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReportsArgs = {
  queryParams: TutorReportQueryParams;
};


export type QueryTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorRequestsArgs = {
  queryParams: TutorRequestQueryParams;
};


export type QueryTutorReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReviewsArgs = {
  queryParams: TutorReviewQueryParams;
};

export type QueryParams = {
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type Quiz = {
  __typename?: 'Quiz';
  assignments?: Maybe<Array<Assignment>>;
  class?: Maybe<Class>;
  classId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuizFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type QuizPagination = {
  __typename?: 'QuizPagination';
  items: Array<Quiz>;
  meta: PaginationMeta;
};

export type QuizQueryParams = {
  filters?: InputMaybe<QuizFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type RegisterInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthday: Scalars['DateTime']['input'];
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender: Gender;
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ScheduleTime = {
  __typename?: 'ScheduleTime';
  /** Values from 0 to 6 equivalent to Sunday to Saturday */
  dayOfWeek: Scalars['Float']['output'];
  endTime: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type ScheduleTimeInput = {
  /** Values from 0 to 6 equivalent to Sunday to Saturday */
  dayOfWeek: Scalars['Float']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortField = {
  direction: SortDirection;
  field: Scalars['String']['input'];
  nulls?: InputMaybe<SortNullDirection>;
};

export enum SortNullDirection {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type Subject = {
  __typename?: 'Subject';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubjectPagination = {
  __typename?: 'SubjectPagination';
  items: Array<Subject>;
  meta: PaginationMeta;
};

export type SubmitAssignmentInput = {
  files: Array<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type TutorDetail = {
  __typename?: 'TutorDetail';
  biography?: Maybe<Scalars['String']['output']>;
  cv: Scalars['String']['output'];
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type TutorReport = {
  __typename?: 'TutorReport';
  author: User;
  authorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  reason: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tutor: User;
  tutorId: Scalars['String']['output'];
};

export type TutorReportFilterParams = {
  tutorId?: InputMaybe<Scalars['ID']['input']>;
};

export type TutorReportPagination = {
  __typename?: 'TutorReportPagination';
  items: Array<TutorReport>;
  meta: PaginationMeta;
};

export type TutorReportQueryParams = {
  filters?: InputMaybe<TutorReportFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type TutorRequest = {
  __typename?: 'TutorRequest';
  createdAt: Scalars['DateTime']['output'];
  cv: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: TutorRequestStatus;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TutorRequestPagination = {
  __typename?: 'TutorRequestPagination';
  items: Array<TutorRequest>;
  meta: PaginationMeta;
};

export type TutorRequestQueryParams = {
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum TutorRequestStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type TutorReview = {
  __typename?: 'TutorReview';
  author: User;
  authorId: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  rating: Scalars['Float']['output'];
  tutor: User;
  tutorId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TutorReviewFilterParams = {
  tutorId?: InputMaybe<Scalars['ID']['input']>;
};

export type TutorReviewPagination = {
  __typename?: 'TutorReviewPagination';
  items: Array<TutorReview>;
  meta: PaginationMeta;
};

export type TutorReviewQueryParams = {
  filters?: InputMaybe<TutorReviewFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type UpdateBlockStatusUserInput = {
  id: Scalars['ID']['input'];
  isBlocked: Scalars['Boolean']['input'];
};

export type UpdateClassInput = {
  id: Scalars['ID']['input'];
  method?: InputMaybe<ClassMethod>;
  name?: InputMaybe<Scalars['String']['input']>;
  schedule?: InputMaybe<Array<ScheduleTimeInput>>;
  totalSlots?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  gradeId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  paymentDate?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGradeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateQuizInput = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubjectInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTutorDetailInput = {
  cv: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateTutorRequestInput = {
  cv?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateTutorRequestStatusInput = {
  id: Scalars['ID']['input'];
  status: TutorRequestStatus;
};

export type UpdateTutorReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['Date']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Role;
  roleId: Scalars['String']['output'];
  tutorDetail?: Maybe<TutorDetail>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserFilterParams = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  roleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  items: Array<User>;
  meta: PaginationMeta;
};

export type UserQueryParams = {
  filters?: InputMaybe<UserFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: string };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string } };

export type TutorRequestsQueryVariables = Exact<{
  queryParams: TutorRequestQueryParams;
}>;


export type TutorRequestsQuery = { __typename?: 'Query', tutorRequests: { __typename?: 'TutorRequestPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'TutorRequest', id: string, cv: string, status: TutorRequestStatus, createdAt: any, updatedAt: any, user: { __typename?: 'User', fullName: string, email: string, phoneNumber: string } }> } };

export type UpdateTutorRequestStatusMutationVariables = Exact<{
  input: UpdateTutorRequestStatusInput;
}>;


export type UpdateTutorRequestStatusMutation = { __typename?: 'Mutation', updateTutorRequestStatus: { __typename?: 'TutorRequest', id: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, email: string, fullName: string, avatar?: string | null, phoneNumber: string, gender: Gender, birthday: any, roleId: string, createdAt: any, updatedAt: any, role: { __typename?: 'Role', name: string } } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, birthday: any, phoneNumber: string, gender: Gender, roleId: string, createdAt: any, updatedAt: any } };

export type GetUsersQueryVariables = Exact<{
  queryParams: UserQueryParams;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UserPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, birthday: any, phoneNumber: string, gender: Gender, roleId: string, createdAt: any, updatedAt: any, tutorDetail?: { __typename?: 'TutorDetail', cv: string } | null, role: { __typename?: 'Role', name: string } }> } };

export type UpdateBlockStatusUserMutationVariables = Exact<{
  input: UpdateBlockStatusUserInput;
}>;


export type UpdateBlockStatusUserMutation = { __typename?: 'Mutation', updateBlockStatusUser: boolean };


export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($token: String!) {
  refreshToken(token: $token)
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TutorRequestsDocument = gql`
    query tutorRequests($queryParams: TutorRequestQueryParams!) {
  tutorRequests(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      cv
      status
      user {
        fullName
        email
        phoneNumber
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useTutorRequestsQuery__
 *
 * To run a query within a React component, call `useTutorRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTutorRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTutorRequestsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useTutorRequestsQuery(baseOptions: Apollo.QueryHookOptions<TutorRequestsQuery, TutorRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TutorRequestsQuery, TutorRequestsQueryVariables>(TutorRequestsDocument, options);
      }
export function useTutorRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TutorRequestsQuery, TutorRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TutorRequestsQuery, TutorRequestsQueryVariables>(TutorRequestsDocument, options);
        }
export type TutorRequestsQueryHookResult = ReturnType<typeof useTutorRequestsQuery>;
export type TutorRequestsLazyQueryHookResult = ReturnType<typeof useTutorRequestsLazyQuery>;
export type TutorRequestsQueryResult = Apollo.QueryResult<TutorRequestsQuery, TutorRequestsQueryVariables>;
export const UpdateTutorRequestStatusDocument = gql`
    mutation updateTutorRequestStatus($input: UpdateTutorRequestStatusInput!) {
  updateTutorRequestStatus(input: $input) {
    id
  }
}
    `;
export type UpdateTutorRequestStatusMutationFn = Apollo.MutationFunction<UpdateTutorRequestStatusMutation, UpdateTutorRequestStatusMutationVariables>;

/**
 * __useUpdateTutorRequestStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTutorRequestStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTutorRequestStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTutorRequestStatusMutation, { data, loading, error }] = useUpdateTutorRequestStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTutorRequestStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTutorRequestStatusMutation, UpdateTutorRequestStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTutorRequestStatusMutation, UpdateTutorRequestStatusMutationVariables>(UpdateTutorRequestStatusDocument, options);
      }
export type UpdateTutorRequestStatusMutationHookResult = ReturnType<typeof useUpdateTutorRequestStatusMutation>;
export type UpdateTutorRequestStatusMutationResult = Apollo.MutationResult<UpdateTutorRequestStatusMutation>;
export type UpdateTutorRequestStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTutorRequestStatusMutation, UpdateTutorRequestStatusMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  getMe {
    id
    email
    fullName
    avatar
    phoneNumber
    gender
    birthday
    roleId
    role {
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  getUser(id: $id) {
    id
    avatar
    fullName
    email
    birthday
    phoneNumber
    gender
    roleId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($queryParams: UserQueryParams!) {
  getUsers(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      avatar
      fullName
      email
      birthday
      phoneNumber
      gender
      roleId
      tutorDetail {
        cv
      }
      role {
        name
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const UpdateBlockStatusUserDocument = gql`
    mutation updateBlockStatusUser($input: UpdateBlockStatusUserInput!) {
  updateBlockStatusUser(input: $input)
}
    `;
export type UpdateBlockStatusUserMutationFn = Apollo.MutationFunction<UpdateBlockStatusUserMutation, UpdateBlockStatusUserMutationVariables>;

/**
 * __useUpdateBlockStatusUserMutation__
 *
 * To run a mutation, you first call `useUpdateBlockStatusUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlockStatusUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlockStatusUserMutation, { data, loading, error }] = useUpdateBlockStatusUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBlockStatusUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlockStatusUserMutation, UpdateBlockStatusUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlockStatusUserMutation, UpdateBlockStatusUserMutationVariables>(UpdateBlockStatusUserDocument, options);
      }
export type UpdateBlockStatusUserMutationHookResult = ReturnType<typeof useUpdateBlockStatusUserMutation>;
export type UpdateBlockStatusUserMutationResult = Apollo.MutationResult<UpdateBlockStatusUserMutation>;
export type UpdateBlockStatusUserMutationOptions = Apollo.BaseMutationOptions<UpdateBlockStatusUserMutation, UpdateBlockStatusUserMutationVariables>;