import passwordValidator from "password-validator";

const schema = new passwordValidator()

schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits(2)


export default function validatePassword(password) {
  return schema.validate(password)
}