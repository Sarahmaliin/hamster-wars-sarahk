import { Link } from 'react-router-dom'

const BadUrl = () => (
	<div>
		Den här sidan finns inte! Prova att gå <Link to="/">tillbaka till startsidan</Link>.
	</div>
)

export default BadUrl