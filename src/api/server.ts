import React from 'react'

let token = 'cc69f79905fc670f5303b2bc1868a2f1a5cf5eeb83d343ca';

export const server_calls = {
  get: async () => {

    const response = await fetch(`http://127.0.0.1:5000/api/cars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    });


    if (!response.ok) {
      throw new Error('Failed to fetch data from server')
    }

    return await response.json()
  },

  create: async(data: any = {}) => {
    const response = await fetch(`http://127.0.0.1:5000/api/cars`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(!response.ok){
        throw new Error('Failed to Create new data on server')
    }

    return await response.json()
},

  update: async (id: string, data: any = {}) => {
    const response = await fetch(`http://127.0.0.1:5000/api/cars/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },
  delete: async (id: string) => {
    const response = await fetch(`http://127.0.0.1:5000/api/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    })
  }
}