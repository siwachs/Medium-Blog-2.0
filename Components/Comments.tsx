import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

//Form Fields
interface InputFormFields {
  _id: string
  name: string
  email: string
  comment: string
}

//Data defination
interface Props {
  _id: string
}

function Comments({ _id }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormFields>()

  //Submit state
  const [submitted, setSubmitted] = useState(false)

  //Submit
  const onSubmit: SubmitHandler<InputFormFields> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .catch((error) => {
        setSubmitted(false)
        console.log(error)
      })
  }

  return submitted ? (
    <div className="mx-auto my-10 flex max-w-2xl flex-col bg-yellow-500 py-10 px-2 text-white">
      <h3 className="text-3xl font-bold">
        Thank you for submitting your comment!
      </h3>
      <p>Once it has been approved, it will approved it will appear below!</p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
    >
      {/* Headers */}
      <h3 className="text-sm text-yellow-500">Enjoy this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="mt-2 py-3"></hr>

      {/* Hidden Field */}
      <input type="hidden" {...register('_id')} value={_id} name="_id"></input>

      <label className="mb-5 block">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full rounded border shadow outline-none ring-yellow-500 focus:ring"
          type="text"
          placeholder="Shubham Siwach"
        ></input>
      </label>

      <label className="mb-5 block">
        <span className="text-gray-700">Email</span>
        <input
          {...register('email', { required: true })}
          className="form-input mt-1 block w-full rounded border shadow outline-none ring-yellow-500 focus:ring"
          type="email"
          placeholder="test@domain.com"
        ></input>
      </label>

      <label>
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          rows={8}
          placeholder="Add a comment..."
        ></textarea>
      </label>

      {/* Validation Errors */}
      <div className="flex flex-col p-5">
        {errors.name && (
          <p className="text-red-500">-The name field is required</p>
        )}
        {errors.email && (
          <p className="text-red-500">-The email field is required</p>
        )}
        {errors.comment && (
          <p className="text-red-500">-The comment field is required</p>
        )}
      </div>

      {/* Submit button */}
      <input
        type="submit"
        className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-semibold text-white shadow hover:bg-yellow-400 focus:outline-none"
        value="Submit"
      ></input>
    </form>
  )
}

export default Comments
