const OptimisticDemo = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold underline">Optimistic Updates Demo</h1>
        <p>This is a demo of the new Optimistic Updates API in React 19.2.</p>
        <p>Optimistic updates allow you to update the UI immediately when a user performs an action, even before the server responds.</p>
        <p>In this demo, we'll show how to create and use actions for common tasks like adding items to a cart, updating user profiles, and more.</p>
    </div>
  );
}   

export default OptimisticDemo;