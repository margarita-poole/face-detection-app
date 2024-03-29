import userEvent from '@testing-library/user-event'
import React from 'react'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch('https://desolate-woodland-50416.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log('user: ', user)
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
      })
  }

  render(props) {
    const { onRouteChange } = this.props
    return (
      <div>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='email'
                    // defaultValue="user@gmail.com"
                    name='email-address'
                    id='email-address'
                    onKeyDown={(e) => {
                      console.log('e: ', e)
                      if (e.keyCode === 13) {
                        this.onSubmitSignIn()
                      }
                    }}
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onKeyDown={(e) => {
                      console.log('e: ', e)
                      if (e.keyCode === 13) {
                        this.onSubmitSignIn()
                      }
                    }}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    // defaultValue="123abc"
                    name='password'
                    id='password'
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSubmitSignIn}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Sign in'
                />
              </div>
              <div className='lh-copy mt3'>
                <p
                  onClick={() => onRouteChange('Register')}
                  className='f6 link dim black db pointer'
                >
                  Register
                </p>
              </div>
            </div>
          </main>
          <div></div>
        </article>
        <div className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
          <div className='lh-copy mt3'>
            <p>
              Please feel free to register or you can use the following
              credentials.
            </p>
            <p>email: user@gmail.com</p>
            <p>password: 123abc</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
