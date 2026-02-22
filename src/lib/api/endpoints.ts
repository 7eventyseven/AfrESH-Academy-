import api from './axiosConfig';

type JsonObject = Record<string, unknown>;

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (name: string, email: string, password: string) => api.post('/auth/register', { name, email, password });
export const getUserProfile = () => api.get('/auth/profile');

export const getCourses = () => api.get('/courses');
export const getCourseById = (id: string) => api.get(`/courses/${id}`);
export const createCourse = (courseData: JsonObject) => api.post('/courses', courseData);
export const updateCourse = (id: string, courseData: JsonObject) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id: string) => api.delete(`/courses/${id}`);

export const getPortfolio = () => api.get('/portfolio');
export const getPortfolioById = (id: string) => api.get(`/portfolio/${id}`);
export const createPortfolio = (portfolioData: JsonObject) => api.post('/portfolio', portfolioData);
export const updatePortfolio = (id: string, portfolioData: JsonObject) => api.put(`/portfolio/${id}`, portfolioData);
export const deletePortfolio = (id: string) => api.delete(`/portfolio/${id}`);

export const enrollInCourse = (courseId: string) => api.post('/enrollments', { courseId });
export const getMyEnrollments = () => api.get('/enrollments/my');
export const updateLessonProgress = (courseId: string, lessonId: string, isCompleted: boolean, progress: number) =>
    api.put(`/enrollments/${courseId}/progress`, { lessonId, isCompleted, progress });

export const uploadImage = (formData: FormData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const uploadVideo = (formData: FormData) => api.post('/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getTeachers = () => api.get('/teachers');
export const createTeacher = (teacherData: JsonObject) => api.post('/teachers', teacherData);
export const updateTeacher = (id: string, teacherData: JsonObject) => api.put(`/teachers/${id}`, teacherData);
export const deleteTeacher = (id: string) => api.delete(`/teachers/${id}`);

export const getUsers = () => api.get('/users');
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export const getAllEnrollments = () => api.get('/enrollments');
export const issueCertificate = (enrollmentId: string) => api.post('/certificates', { enrollmentId });
export const getMyCertificates = () => api.get('/certificates/my');
