import { objectRecordDiffMerge } from 'src/engine/core-modules/event-emitter/utils/object-record-diff-merge';

describe('objectRecordDiffMerge', () => {
  it('should not produce an A→A entry when a field is reverted to its original value', () => {
    const firstUpdate = { diff: { city: { before: 'A', after: 'B' } } };
    const revertUpdate = { diff: { city: { before: 'B', after: 'A' } } };

    const result = objectRecordDiffMerge(firstUpdate, revertUpdate);

    expect(result.diff).not.toHaveProperty('city');
  });

  it('should keep the oldest before and newest after, and keep fields changed only once', () => {
    const firstUpdate = {
      diff: {
        city: { before: 'A', after: 'B' },
        jobTitle: { before: 'Engineer', after: 'Manager' },
      },
    };
    const secondUpdate = { diff: { city: { before: 'B', after: 'C' } } };

    const result = objectRecordDiffMerge(firstUpdate, secondUpdate);

    expect(result.diff).toEqual({
      city: { before: 'A', after: 'C' },
      jobTitle: { before: 'Engineer', after: 'Manager' },
    });
  });
});
