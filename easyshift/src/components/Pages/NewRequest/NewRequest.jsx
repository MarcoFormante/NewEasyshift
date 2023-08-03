import React from 'react'
import Title from '../../Layout/Title/Title'
import FormNewRequest from './FormNewRequest'

const NewRequest = () => {
console.log("sd");
  return (
    <div>
      <Title classname={"page-title"}
        title={`New request`}
        style={{ fontSize: 24 }}
      />
      <FormNewRequest/>
    </div>
  )
}

export default NewRequest
