import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render project cards', async () => {
		render(Page, {
			props: {
				data: {
					projects: [
						{
							id: 1,
							slug: 'test-project',
							cover_url: null,
							t: { title: 'Test Project' }
						}
					]
				}
			}
		});

		const heading = page.getByRole('heading', { level: 2 });
		await expect.element(heading).toBeInTheDocument();
		await expect.element(heading).toHaveTextContent('Test Project');
	});
});
