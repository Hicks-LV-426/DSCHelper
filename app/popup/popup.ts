export class Popup 
{
  // menu handling
  private mouseOver : boolean = false;
  private popupVisible : boolean = false;

  public toggle()
  {
    this.popupVisible = !this.popupVisible;
  }
  public getVisibilityClass() : string
  {
    return this.popupVisible ? "show" : "hide";
  }
  public getButtonClasses() : string
  {
    return this.popupVisible ? "popup-button pointer no-select popup-button-selected" : "popup-button pointer no-select";
  }
  public handleMouseOut()
  {
    this.mouseOver = false;
    setTimeout(() => 
    {
      if (!this.mouseOver && this.popupVisible) this.hide();
      }, 
      800);
  }
  public handleMouseOver()
  {
    this.mouseOver = true;
  }
  public hide()
  {
    this.popupVisible = false;
  }
}