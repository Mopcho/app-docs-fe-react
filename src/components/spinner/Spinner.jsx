export const Spinner = () => {
    return(
        <>
        <div className="fixed h-full w-full top-0 left-0 opacity-50 bg-blue-500">
        </div>
        <div class="spin-container">
      <div class="spin" id="loader"></div>
      <div class="spin" id="loader2"></div>
      <div class="spin" id="loader3"></div>
      <div class="spin" id="loader4"></div>
      <span id="spin-text">LOADING...</span>
    </div>
        </>

    )
}