import React from 'react';
import classNames from 'classnames';

function Cell({x, y, value, selected, highlighted, dispatch}) {
	return (
		<td
			className={classNames({
				grid__cell: true,
				'grid__cell--blocked': value.blocked,
				'grid__cell--selected': selected,
				'grid__cell--highlighted': highlighted,
				'grid__cell--valid': value.locked
			})}
			onClick={() => {
				dispatch({
					type: 'cellClick',
					payload: {
						x,
						y
					}
				})
			}}
		>
			{value.blocked ? '' : value.content}
		</td>
	)
}

export default Cell;
