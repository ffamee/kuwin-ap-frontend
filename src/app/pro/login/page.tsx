//const isLoading: boolean = true;

export default async function Page() {
  return (
    <div className="w-screen h-screen bg-[#FFFEEA] place-content-center place-items-center">
      <form className="bg-white px-4 py-2 m-1 w-1/6 place-items-center border">
        <h1 className="font-bold">Log in</h1>
        <input type="text" placeholder="username" className="py-1" />
        <br />
        <input type="password" placeholder="password" />
        <button type="submit" value="Submit" className="w-max p-2.5 border">
          Submit
        </button>
      </form>
    </div>
  );
}
