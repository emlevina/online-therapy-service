import axios from 'axios';

export const getCurrentAppointment =  () => {
    return axios.get('/api/appointments/user')
}

export const getConvo = (user1Id, user2Id) => {
    return axios.get(`/api/conversations/${user1Id}/${user2Id}`)
}

export const createConvo = (currUser, _id) => {
    return axios.post(`/api/conversations/`, {
        participants: [currUser, _id]
    })
}

export const getUsers = () => {
    return axios.get(`/api/users`)
}

export const createMessage = (conversationId, text, sender) => {
    return axios.post(`api/messages`, {
        conversationId,
        text,
        sender
    })
}

export const getMessages = (conversationId) => {
    return axios.get(`/api/messages/${conversationId}`)
}

export const bookAppointment = (appointmentId) => {
   return axios.put(`/api/appointments/book/${appointmentId}`)
}

export const cancelAppointment = (appointmentId) => {
   return axios.put(`/api/appointments/cancel/${appointmentId}`)
}

export const getTherapistAppointments = (therapistId) => {
   return axios.get(`/api/appointments/therapist/${therapistId}`)
}

export const getTherapists = () => {
    return axios.get('/api/therapists')
}

export const getCurrentUser = () => {
    return axios.get('/api/users/user')
}

export const getToken = () => {
    return axios.get('/api/token')
}

export const login = (payload) => {
    return axios.post('/api/login', payload)
}

export const register = (payload) => {
    return axios.post('/api/register', payload)
}

export const getMethods = () => {
    return axios.get('/api/methods')
}

export const getThemes = () => {
    return axios.get('/api/themes')
}

export const getTherapistDetailsFiltered = (filter) => {
    return axios.post('/api/therapistdetails/filter', filter)
}

export const updateCurrentUser = (updatedInfo) => {
    return axios.put('/api/users', updatedInfo)
}