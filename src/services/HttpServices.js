const apiUrl = 'http://127.0.0.1:8000/api'

export const register = async ({name,email,password,confirm_password}) => {

        const user={
            name,
            password,
            email,
            confirm_password
        }
        try{
            const res = await fetch( apiUrl +'/register',
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            const data = await res.json()

            console.log(data);
            if (data.error?.email)                
                return data.error?.email;
            else if (data.error?.confirm_password)                
                return data.error?.confirm_password;
            else if (data.error?.password)                
                return data.error?.password;
            else if(data.error?.name)                
                return data.error?.name;
            }
        catch{
            return 'Registration unsuccessful, try again.'
        }
        return '';
}

export const login = async ({email,password}) => {

        const user={
            password,
            email,
        }
        const res = await fetch(apiUrl+ '/login',
        {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json' ,
            },
            body : JSON.stringify(user)
        })

        const data = await res.json()
        localStorage.setItem('token', data.token)

        //console.log(data.message)
        console.log(data.token)

        return data.message
    }

    export const logout = async () => {

        const res = await fetch(apiUrl+ '/logout',
        {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json' ,
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })

        const message = await res.json();
        if (message.message === 'You logged out successfully!')
            localStorage.removeItem('token')
        console.log(message.message)

        return message.message
    }

    export const me = async () => {

        const res = await fetch(apiUrl+ '/me',
        {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json' ,
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })

        const data = await res.json()

        console.log(data)

        return data
    }

export const getMovies = async () => {

    const res = await fetch(apiUrl+ '/movies',
    {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json' ,
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
    })

    const data = await res.json()
    //console.log(data)
    return data
}

export const getMovie = async ({id}) => {

    const res = await fetch(apiUrl+ `/movies/${id}`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json' ,
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
    })

    const data = await res.json()
    //console.log(data.data)
    return data.data
}

export const addMovie = async ({title,description,cover_image,genre}) => {

    const movie={
        title,
        description,
        cover_image,
        genre
    }

    try{
        const res = await fetch( apiUrl +'/movies',
        {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify(movie)
        })
        const data = await res.json()

        if (data.message)                
            return data.message;
        }
    catch{
        return 'Movie not created, try again.'
    }
    return '';
}

export const getGenreTypes = async () => {

    const res = await fetch(apiUrl+ '/genres',
    {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json' ,
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
    })

    const data = await res.json()
    console.log(data.data)
    //const dataArray = Object.values(data)
    return data.data
}