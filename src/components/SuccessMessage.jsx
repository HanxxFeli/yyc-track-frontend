// Green success notification displayed after successful registration

const SuccessMessage = ({ message }) => {
  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
      ✓ {message}
    </div>
  );
};

export default SuccessMessage;