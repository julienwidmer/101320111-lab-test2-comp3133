import {Rocket} from "./rocket.model";
import {LaunchSite} from "./launch-site.model";
import {LaunchFailureDetails} from "./launch-failure-details.model";
import {Links} from "./links.model";

export interface Mission {
  mission_name: string;
  launch_year: string;
  rocket: Rocket;
  launch_site: LaunchSite;
  launch_success?: boolean | null;
  launch_failure_details?: LaunchFailureDetails | null;
  links: Links;
  details?: string | null;
}
