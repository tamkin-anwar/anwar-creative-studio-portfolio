export const OPEN_EVENT = 'acs:open-command-palette'

/** Opens the palette from anywhere, such as the header's Search button. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}
