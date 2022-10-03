import GreatWork from '../assets/GreatWork.png';
import TeamPlayer from '../assets/TeamPlayer.png';
import ThankYou from '../assets/ThankYou.png';

export const BadgeTypes = {
    GreatWorkCard: "Great Work",
    TeamPlayerCard: "Team Player",
    ThankYouCard: "Thank You"
}

export const BadgesList = [
    {
        cardName: BadgeTypes.GreatWorkCard,
        image: GreatWork,
        value: 5
    },
    {
        cardName: BadgeTypes.TeamPlayerCard,
        image: TeamPlayer,
        value: 10
    },
    {
        cardName: BadgeTypes.ThankYouCard,
        image: ThankYou,
        value: 15
    }
];
