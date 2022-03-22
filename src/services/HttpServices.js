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

            console.log(data)
            console.log(data.error)
            if (data.error.email)                
                return data.error.email;
            else if (data.error.confirm_password)                
                return data.error.confirm_password;
            else if (data.error.password)                
                return data.error.password;
            else if(data.error.name)                
                return data.error.name;
            }
        catch{
            return 'Registration unsuccessful, try again.'
        }
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

        console.log(data.message)
        console.log(data.token)

        return data.message
    }

