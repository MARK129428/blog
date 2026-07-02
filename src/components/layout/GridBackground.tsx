export function GridBackground() {
  return (
    <>
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-20 vercel-grid'
      />
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 bg-background/80'
      />
      <div
        aria-hidden
        className='pointer-events-none fixed left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 vercel-glow'
      />
    </>
  );
}
