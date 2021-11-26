import { authService, createUser, signUser, googleAuth, githubAuth, popUp } from "fBase";
import React, { useState } from "react";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async(event) => { //회원가입 혹은 로그인
    event.preventDefault();
    try{
      if(newAccount) {
      await createUser(authService, email, password)
        .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    // ...
      })
    } else {
      await signUser(authService, email, password)
        .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    // ...
      })
    }
    } catch(error) {
      setError(error.message);
    }
  };
    
  const toggleAccount = () => setNewAccount((pre) => !pre);

  //다른 서비스 로그인
  const onSocialClick = async (event) => {
    const {target:{name}} = event;
    let provider;
    let prov;
    if(name === "google") { //구글로 로그인 할때
          provider = new googleAuth(); 
          prov = googleAuth;
    } else if(name === "github"){ //깃허브로 로그인 할때
        provider = new githubAuth();
        prov = githubAuth;
    }
    await popUp(authService, provider)
      .then((result) => {
        const credential = prov.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;