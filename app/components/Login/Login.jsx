import c from './Login.module.css'
export default function Login() {
  return (
    <div className={c.cont}>
      <img className={c.logo} src="/quiosque-white.png" alt="logo" />
      <div className={c.loginCont} >
        Login
      </div>
    </div>
  );
}
