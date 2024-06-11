import React from "react"
import "./Header.css"
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigation = useNavigate()
    const text = "SOUTHERN HOME RENTALS";

    
    return(
        <>
        <div className="maindiv">
        <div className="animated-h1" style={{ fontFamily: "Abril Fatface", color: "#24305e", fontWeight: 'bolder', fontSize: '230%', textAlign: "center" }}>
        {text.split("").map((char, index) => (
          <span key={index} className={char === " " ? "space" : ""}>
            {char}
          </span>
        ))}
        </div>
            <div>
                <button type="submit" className="registerbtn" onClick={()=>navigation("/Register")}>REGISTER</button>
            </div>
                    
            <div>
                <button type="submit" className="loginbtn" onClick={()=>navigation("/Login")}>LOGIN</button>
            </div>
        </div>
        </>
    )
}