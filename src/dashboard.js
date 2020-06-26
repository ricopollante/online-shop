import React from 'react'
import Products from './dashboard/products'
import Header from './header'

class Dashboard extends React.Component{
    constructor(){
        super();
    }


    render(){
    return(
        <section>
            <Header />
            <Products />
        </section>
    
    )
}
}

export default Dashboard;