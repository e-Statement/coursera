import {Authorize, IsAuthorize} from "../Requests";
import {Redirect} from "react-router-dom";
import {red} from "@material-ui/core/colors";
import {useState} from "react";

export const AuthorizationForm = () =>{
    var [getstate, setState] = useState({email: "", password: "", errorText: ""});

    return (
        <div>
            <div><label color={red}>{getstate.errorText}</label></div>
        <form className="form-signin"  >
            <h2 className="form-signin-heading"> Please sign in </h2>
            <div>
                <label> Email address</label>
                <input id="inputEmail"
                       placeholder="Email address"
                       onChange={(e)=>{updateLocalState(getstate,"email", e.target.value)}} />
            </div>
            <div>
                <label > Password</label>
                <input type="password"
                       placeholder="Password"
                       onChange={(e)=>updateLocalState(getstate,"password", e.target.value)} />
            </div>
            <button  type={"button"} onClick={()=> {renderLoginRequest(getstate);}} > Sign in</button>
        </form>
        </div>
    )
}

export const AuthorizationManager = () =>{
    const isAuth = IsAuthorize();
    console.log(isAuth);
    if (isAuth == true)
        return;
    return <Redirect to='/Auth' />
}

function updateLocalState(state, bindValue: string, value: string)
{
    state[bindValue] = value;
    console.log(state);
}

function renderLoginRequest(state)
{
    console.log(state);
    Authorize(state.email, state.password).then(r => {
        console.log(r);
        if (r.redirected)
            window.location.assign(r.url);
        return r.text();
    }).then(error=>state.errorText = error)
        .then(x=>console.log(x));
}