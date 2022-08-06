import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function toResponsive(orientation, percent) {
  /**
   * Create a react-native-responsive-screen string based on the given orientation(widthPercentageToDP, heightPercentageToDP) and value.
   */
  return orientation(percent.toString() + "%");
}

export function heightResponsive(percent) {
  /**
   *  Take percent height of screen using react-native-responsive-screen.
   */
  return toResponsive(hp, percent);
}

export function widthResponsive(percent) {
  /**
   *  Take percent height of screen using react-native-responsive-screen.
   */
  return toResponsive(wp, percent);
}
