import TeamMentionHighlightController from '../../../components/TeamMentionHighlight/TeamMentionHighlightController';

describe('TeamMentionHighlightController', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return viewable when going from scratch', () => {
    const isEnabled = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(true);
  });

  it('should not be viewable after 5 renders', () => {
    // Four times is fine
    TeamMentionHighlightController.registerRender();
    TeamMentionHighlightController.registerRender();
    TeamMentionHighlightController.registerRender();
    TeamMentionHighlightController.registerRender();

    const isEnabledFour = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabledFour).toBe(true);

    // Fifth is not
    TeamMentionHighlightController.registerRender();
    const isEnabledFive = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabledFive).toBe(false);
  });

  it('should not be viewable after closing dialog', () => {
    TeamMentionHighlightController.registerClosed();
    const isEnabled = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after making a team mention', () => {
    TeamMentionHighlightController.registerTeamMention();
    const isEnabled = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after creating a team', () => {
    TeamMentionHighlightController.registerCreateLinkClick();
    const isEnabled = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after multple criteria met', () => {
    TeamMentionHighlightController.registerRender();
    TeamMentionHighlightController.registerClosed();
    TeamMentionHighlightController.registerCreateLinkClick();
    TeamMentionHighlightController.registerRender();

    const isEnabled = TeamMentionHighlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });
});
