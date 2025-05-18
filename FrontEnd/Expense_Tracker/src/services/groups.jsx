import api from './api';

export const getGroups = async() => {
    const response = await api.get('/groups/');
    return response.data;
};

export const getGroupDetails = async(id) => {
    const response = await api.get(`/groups/${id}/`);
    return response.data;
};

export const createGroup = async(groupData) => {
    const response = await api.post('/groups/', groupData);
    return response.data;
};

export const getGroupReports = async(groupId) => {
    const response = await api.get(`/groups/${groupId}/reports/`);
    return response.data;
};