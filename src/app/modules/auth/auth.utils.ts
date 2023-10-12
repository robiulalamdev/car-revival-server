// Function to select user fields excluding 'password'
export function selectUserFields() {
  return {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
  };
}
