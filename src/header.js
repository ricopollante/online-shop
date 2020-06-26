import React from 'react'

class Header extends React.Component{
    render(){
    return(
        <header>
            <nav>
                <ul>
                    <li>HOME</li>
                    <li>DASHBOARD</li>
                    <li>USERS</li>
                    <li>SETTINGS</li>

                </ul>
            </nav>
        </header>
    )
    }
}

export default Header;