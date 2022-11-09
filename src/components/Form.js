// const Form = () => {

//     return (
//         <main>
//             <h1>Form</h1>
//         </main>
//     )
// }

// export default Form



// YOU WILL BE INSTRUCTED WHEN YOU SHOULD 
// UNCOMMENT THIS CODE

import {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import AuthContext from '../store/authContext'

const Form = () => {
    const {token, userId} = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState(true)

    const handleSubmit = e => {
        e.preventDefault()

        console.log(title, content, status, userId)

        axios.post('http://localhost:4005/posts', {title, content, status, userId}, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                navigate('http://localhost:4005/profile')
            })
            // error is happening in Form.js file?
            .catch(err => console.log(err,'hi'))
    }

    return (
        <main>
            <form className='form add-post-form' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className='form-input add-post-input'
                />
                <textarea 
                    type='text'
                    placeholder='content'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className='form-input add-post-input textarea'
                />
                <div className='flex-row status-container'>
                    <div className='radio-btn'>
                        <label htmlFor='private-status'>
                            private:
                        </label>
                        <input 
                            type='radio'
                            name='status'
                            id='private-status'
                            value={true}
                            onChange={e => setStatus(e.target.value)}
                            checked={true}
                        />
                    </div>
                    <div className='radio-btn'>
                        <label htmlFor='public-status'>
                            public:
                        </label>
                        <input 
                            type='radio'
                            name='status'
                            id='public-status'
                            value={false}
                            onChange={e => setStatus(e.target.value)}
                        />
                    </div>
                </div>
                <button className='form-btn'>submit</button>
            </form>
        </main>
    )
}

export default Form