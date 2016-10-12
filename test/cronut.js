import test from 'whim/lib/test';
import cronut from '../index';

test('should schedule a task', async t => {
	let count = 0;

	const cron = cronut();
	const removeTask = cron('*/1 * * * * *', () => {
		count += 1;
	});

	return new Promise(resolve => {
		setTimeout(removeTask, 5100);
		setTimeout(() => {
			t.is(count >= 4 && count <= 6, true);
			resolve();
		}, 10100);
	});
});
