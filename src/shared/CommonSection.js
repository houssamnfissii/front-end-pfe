import React from 'react'
import './common-section.css'

import {Container ,Row , Col} from 'reactstrap'
export default function CommonSection({title}) {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col  lg="12" className='text-center' >
            <h1 >{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
