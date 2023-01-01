/* tells nextjs that this is a client component because it is dynamic(using onClick)*/
"use client";

function LogoutButton() {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log('hello')}
      >
        Sign Out
      </button>
    </div>
  )
}

export default LogoutButton;