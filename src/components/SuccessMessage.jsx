// Green success notification displayed after successful registration

const SuccessMessage = ({ message }) => {
  return (
    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
      ✓ {message}
    </div>
  );
};

export default SuccessMessage;