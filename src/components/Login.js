import axios from 'axios';
import swAlert from '@sweetalert/with-react';

function Login() {

    const submitHandler = (e) => {
        e.preventDefault();
        
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = e.target.email.value;
        const password = e.target.password.value;

        let validarEmail = regexEmail.test(email);
        const usuario = 'challenge@alkemy.org';
        const pass = 'react';

        //! Validaciones del email y la contraseña

        if(!email || !password) {
            swAlert('Los campos no pueden ser vacios', {
                icon: 'error',
                timer: 2000,
                button: false
            });
            //swAlert('ha ocurrido un error!', 'Los campos no pueden ser vacios', 'error');
            return;
        }

        if(email !== '' && !validarEmail)  {
            swAlert('Debes Escribir una dirección de correo válida!', {
                icon: 'error',
                timer: 2000,
                button: false
            });
            //swAlert('ha ocurrido un error!', 'Debes Escribir una dirección de correo válida!', 'error');
            return;
        }

        if(email !== usuario || password !== pass) {
            swAlert('Credenciales Inválidas!!!', {
                icon: 'error',
                timer: 2000,
                button: false
            });
            //swAlert('ha ocurrido un error!', 'Credenciales Inválidas!!!', 'error');
            return;
        }

        console.log('Estamos listos para mandar la info');
        axios
        .post('http://challenge-react.alkemy.org', {email, password})
        .then(res => {
            swAlert('Bienvendo', {
                icon: 'success',
                timer: 1000,
                button: false
            });

            const tokenRecibido = res.data.token;
            localStorage.setItem('token', tokenRecibido); //! Añado el Token al LocalStorage
        });
    };

    return (
        <>
            <h2>Formulario de Login</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo Electrónico:</span> <br/>
                    <input type="email" name="email"></input>
                </label>
                <br/>
                <label>
                    <span>Contraseña:</span> <br/>
                    <input type="password" name="password"></input>
                </label>
                <br/>
                <button type="submit">Ingresar</button>
            </form>
        </>
    );
}

export default Login;