import React from 'react';

const faqArr = [
	{
		q: 'What is a pod?',
		a:
			"A pod can be defined as a group of LinkedIn users who all conform to abide by certain guidelines of that specific group. It is basically a group of people who have joined to acquire more engagement (likes, comments, shares) on LinkedIn. Once you join a pod, other members from the pod will automatically like and comment on your published posts on LinkedIn. LinkedIn's algorithm organically boosts posts with higher engagement rates and hence with the help of pods, your posts will become viral in no time.",
	},
	{
		q: 'How do Phantompod work?',
		a:
			"Phantompod helps you create or join engagement pods. These pods work by utilising the LinkedIn post algorithm and feed mechanism. The engagement pods function by linking the pod members' LinkedIn accounts through synchronising engagements on the published posts. It functions as a Google Chrome Extension. The results from each pod may vary depending on the niche of the posts, reach of the pod members and other related factors. ",
	},
	{
		q: 'Are LinkedIn engagement pods safe?',
		a:
			'LinkedIn prohibits automation software and hence safety of the accounts linked to pods can be a matter of concern. Phantompod’s innovative algorithm is designed to mimic human behaviour. So it possesses lesser or no risk at all. All our listed pods ensure quality engagement and organic reach for your content. ',
	},
	{
		q: 'Will the pricing fluctuate after subscription?',
		a:
			'We have made a unified pricing plan that suits brands and individuals alike. This plan provides unlimited access to post scheduling, pod creation, pod memberships and much more. We keep our pricing straightforward and transparent to avoid confusions. Once you subscribe to our plan, we never ask for additional charges nor charge for add-ons. ',
	},
	{
		q: 'Why does automating engagements matter?',
		a:
			'The LinkedIn algorithm calculates the velocity of the post based on the type of engagement it receives. It also considers how quickly the post received engagements. Experts term the posting hour as the Golden Hour of engagement. Automation helps to make appropriate engagement within the Golden Hour to maximize the potential reach of the published post. Getting early engagements in LinkedIn is really important. And automating the post comments is one of the easiest ways to achieve this. ',
	},
	{
		q: 'Can I add or remove members from a pod?',
		a:
			"Phantompod allows users to create different pods within the system. The pod admin has the authority to add or remove members in the pod. If you own a pod, you can easily add or remove any member as you like. In other cases, you might have to request the pod admin for the same. Pod admins might kick out members who don't follow pod rules, without any notice. ",
	},
	{
		q: "What is included in Phantompod's free trial?",
		a:
			'We offer a 7 days free trial for all users. The user can submit up to 5 posts per day during the trial period. The premium pods membership can be only availed after purchasing the premium plan of Phantompod.',
	},
];

const Row = ({ item, isOpen }) => {
	const [open, setOpen] = React.useState(isOpen);
	return (
		<React.Fragment>
			<div className="faq-header" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
				<h3 className="faq-head">{item.q}</h3>
				<span className="faq-arrow">
					<img src={open ? 'img/icons/up-chevron.png' : 'img/icons/down-chevron.png'} alt="" />
				</span>
			</div>
			<div className="faq-content" style={{ display: open ? 'block' : 'none' }}>
				<p>{item.a}</p>
			</div>
		</React.Fragment>
	);
};

export default () => (
	<React.Fragment>
		<div className="faq-wrapper faq-open">
			<div className="title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Frequently Asked Questions ({faqArr.length})</h4>
				</div>
			</div>
			<br />
			{faqArr.map((x, i) => (
				<Row item={x} key={i} isOpen={i === 0} />
			))}
		</div>
	</React.Fragment>
);
