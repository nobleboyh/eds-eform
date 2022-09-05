import React, { useRef, useState } from 'react'
import styles from './style.module.scss'
import images from '../../assets/images'
import api from '../../assets/api'
const EForm = () => {
  let form = useRef()
  let nameInput = useRef()
  let [name, setName] = useState("");
  let [message, setMessage] = useState("");

  let doSubmit = (e)=>{
    e.preventDefault();
    if(name === "" || message === ""){
      console.error("[User] Some of input fields are empty");
      alert("Some of input fields are empty");
      return;
    }

    fetch(api.script, { method: 'POST', body: new FormData(form.current)})
      .then(response => {
        console.log('Success!', response)
        setMessage("");
        setName("");
        nameInput.current.focus()
        alert("Thank you for your information")
      })
      .catch(error => console.error('Error!', error.message))
  }

  let doReset = (e) =>{
    e.preventDefault();
    setMessage("");
    setName("");
  }


  return (
    <form method='post' ref={form} className={styles.form}>
      <img src={images.logo} alt="" class={styles.logo}></img>
      <h1> Test E-Form</h1>
        <label htmlFor='name'>Name: </label>
        <input name='name' autoComplete="off" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} ref={nameInput}></input>
        <label htmlFor='message' >Message: </label>
        <textarea name='message' placeholder='Hi there' autoComplete="off" rows="3" value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>

        <div className={styles.buttons}>
          <button className={styles.submitBtn} onClick={(e) => doSubmit(e)}> Submit</button>
          <button className={styles.resetBtn} onClick={(e) => doReset(e)}> Reset Form</button>
        </div>
    </form>
  )
}

export default EForm