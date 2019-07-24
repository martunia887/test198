import TeamMentionSpotlightController from '../../../components/TeamMentionSpotlight/TeamMentionSpotlightController';

describe('TeamMentionSpotlightController', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return viewable when going from scratch', () => {
    const isEnabled = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(true);
  });

  it('should not be viewable after 5 renders', () => {
    // Four times is fine
    TeamMentionSpotlightController.registerRender();
    TeamMentionSpotlightController.registerRender();
    TeamMentionSpotlightController.registerRender();
    TeamMentionSpotlightController.registerRender();

    const isEnabledFour = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabledFour).toBe(true);

    // Fifth is not
    TeamMentionSpotlightController.registerRender();
    const isEnabledFive = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabledFive).toBe(false);
  });

  it('should not be viewable after closing dialog', () => {
    TeamMentionSpotlightController.registerClosed();
    const isEnabled = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after making a team mention', () => {
    TeamMentionSpotlightController.registerTeamMention();
    const isEnabled = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after creating a team', () => {
    TeamMentionSpotlightController.registerCreateLinkClick();
    const isEnabled = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });

  it('should not be viewable after multple criteria met', () => {
    TeamMentionSpotlightController.registerRender();
    TeamMentionSpotlightController.registerClosed();
    TeamMentionSpotlightController.registerCreateLinkClick();
    TeamMentionSpotlightController.registerRender();

    const isEnabled = TeamMentionSpotlightController.isSpotlightEnabled();
    expect(isEnabled).toBe(false);
  });
});
