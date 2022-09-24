import { useState, useEffect } from 'react';

type Props = {
	children: JSX.Element | JSX.Element[];
	fallback?: JSX.Element;
};

export function ClientOnly({ children, fallback }: Props) {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return fallback || null;
	}
	return <> {children} </>;
}
